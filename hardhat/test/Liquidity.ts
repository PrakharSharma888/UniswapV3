import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Liquidity", function () {
  let DAI_WHALE = "0xD1668fB5F690C59Ab4B0CAbAd0f8C1617895052B";
  let USDC_WHALE = "0xD6153F5af5679a75cC85D8974463545181f48772";
  let DAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  let USDC = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  let POSITION_MANAGER = "0xC36442b4a4522E871399CD717aBDD847Ab11FE88";

  const USDC_AMOUNT = ethers.parseUnits("10", 6);
  const DAI_AMOUNT = ethers.parseUnits("10", 18);

  let liquidityContract: any;
  let daiContract: any;
  let usdcContract: any;
  let signers: any;
  let posManager: any;
  let obj: any;

  before(async () => {
    const daiSigner = await ethers.getImpersonatedSigner(DAI_WHALE);
    const usdcSigner = await ethers.getImpersonatedSigner(USDC_WHALE);

    signers = await ethers.getSigners();

    await signers[0].sendTransaction({
      to: DAI_WHALE,
      value: ethers.parseEther("10"),
    });

    await signers[0].sendTransaction({
      to: USDC_WHALE,
      value: ethers.parseEther("10"),
    });

    daiContract = await ethers.getContractAt("IERC20", DAI);
    usdcContract = await ethers.getContractAt("IERC20", USDC);

    posManager = await ethers.getContractAt(
      "INonfungiblePositionManager",
      POSITION_MANAGER
    );

    await daiContract
      .connect(daiSigner)
      .transfer(signers[0].address, DAI_AMOUNT);
    await usdcContract
      .connect(usdcSigner)
      .transfer(signers[0].address, USDC_AMOUNT);

    // console.log("Balance of user for dai", await daiContract.balanceOf(signers[0].address));
    // console.log("Balance of user for ether", await ethers.provider.getBalance(signers[0].address));
    // console.log("Balance of whale for ether", await daiContract.balanceOf(DAI_WHALE));

    let contract = await ethers.deployContract("Liquidity", [POSITION_MANAGER]);
    liquidityContract = await contract.waitForDeployment();

    await daiContract.approve(liquidityContract.target, ethers.MaxUint256);
    await usdcContract.approve(liquidityContract.target, ethers.MaxUint256);

    console.log("Liquidity contract deployed at: ", liquidityContract.target);
  });

  it("Should add liquidity", async function () {

    console.log("Balance before giving liquidity", await daiContract.balanceOf(signers[0].address));
    obj = await liquidityContract.mintPosition.staticCall(DAI_AMOUNT, USDC_AMOUNT);
    const tx = await liquidityContract.mintPosition(DAI_AMOUNT,USDC_AMOUNT);
    console.log("TokenId?", obj.tokenId);
    await tx.wait();
    console.log(tx);
    console.log("Balance after giving liquidity", await daiContract.balanceOf(signers[0].address));

    console.log("ERC721 :", await posManager.balanceOf(liquidityContract.target));
  });

  it("Should collect fees", async function () {
    await posManager.approve(liquidityContract.target, obj.tokenId);

    const tx = await liquidityContract.collectAllFees(obj.tokenId);
    await tx.wait();
    console.log(tx);
  });
});
