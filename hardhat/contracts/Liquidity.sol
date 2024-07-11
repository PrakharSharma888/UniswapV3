// SPDX-License-Identifier: MIT
pragma solidity ^0.7.5;
pragma abicoder v2;

import "@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol";
import "@uniswap/v3-periphery/contracts/interfaces/INonfungiblePositionManager.sol";
import "@uniswap/v3-core/contracts/libraries/TickMath.sol";

import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/SafeERC20.sol";

import "hardhat/console.sol";

contract Liquidity is IERC721Receiver {
    using SafeERC20 for IERC20;

    IERC20 public DAI = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    IERC20 public USDC = IERC20(0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48);

    uint24 public constant poolFee = 100;

    INonfungiblePositionManager public immutable nonFunPosManager;

    struct Deposits {
        address owner;
        uint256 liquidity;
        address token0;
        address token1;
    }

    mapping(uint256 => Deposits) public deposits;

    constructor(INonfungiblePositionManager _nonFunPosManager) {
        nonFunPosManager = _nonFunPosManager;
    }

    function onERC721Received(
        address operator,
        address, // from param is omitted as it is not usefull here
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        // get position information
        _createDeposit(operator, tokenId);
        return this.onERC721Received.selector;
    }

    function _createDeposit(address owner, uint256 tokenId) internal {
        {
            (
                ,
                ,
                address token0,
                address token1,
                ,
                ,
                ,
                uint128 liquidity,
                ,
                ,
                ,

            ) = nonFunPosManager.positions(tokenId);

            deposits[tokenId] = Deposits(owner, liquidity, token0, token1);
        }
    }

    function mintPosition(
        uint256 token0Amount,
        uint256 token1Amount
    )
        external
        returns (
            uint256 tokenId,
            uint128 liquidity,
            uint256 amount0,
            uint256 amount1
        )
    {
        DAI.safeTransferFrom(msg.sender, address(this), token0Amount);
        USDC.safeTransferFrom(msg.sender, address(this), token1Amount);

        DAI.approve(address(nonFunPosManager), type(uint256).max);
        USDC.approve(address(nonFunPosManager), type(uint256).max);

        INonfungiblePositionManager.MintParams
            memory params = INonfungiblePositionManager.MintParams({
                token0: address(DAI),
                token1: address(USDC),
                fee: poolFee,
                tickLower: TickMath.MIN_TICK,
                tickUpper: TickMath.MAX_TICK,
                amount0Desired: token0Amount,
                amount1Desired: token1Amount,
                amount0Min: 0,
                amount1Min: 0,
                recipient: msg.sender,
                deadline: block.timestamp
            });

        (tokenId, liquidity, amount0, amount1) = nonFunPosManager.mint(params);

        _createDeposit(msg.sender, tokenId);

        if (amount0 < token0Amount) {
            uint256 refund = token0Amount - amount0;
            DAI.safeTransfer(msg.sender, refund);
        }

        if (amount1 < token1Amount) {
            uint256 refund = token1Amount - amount1;
            USDC.safeTransfer(msg.sender, refund);
        }
    }

    function collectAllFees(
        uint256 tokenId
    ) external returns (uint256 amount0, uint256 amount1) {
        nonFunPosManager.safeTransferFrom(msg.sender, address(this), tokenId);

        INonfungiblePositionManager.CollectParams
            memory params = INonfungiblePositionManager.CollectParams({
                tokenId: tokenId,
                recipient: address(this),
                amount0Max: type(uint128).max,
                amount1Max: type(uint128).max
            });

        (amount0, amount1) = nonFunPosManager.collect(params);

        _sendToOwner(tokenId, amount0, amount1);
    }

    function _sendToOwner(
        uint256 tokenId,
        uint256 amount0,
        uint256 amount1
    ) internal {
        address owner = deposits[tokenId].owner;

        // address token0 = deposits[tokenId].token0;
        // address token1 = deposits[tokenId].token1;

        DAI.safeTransfer(owner, amount0);
        USDC.safeTransfer(owner, amount1);
    }
}
