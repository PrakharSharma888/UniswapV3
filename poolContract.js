"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.poolContract = exports.provider = exports.CurrentConfig = exports.QUOTER_CONTRACT_ADDRESS = exports.POOL_FACTORY_CONTRACT_ADDRESS = void 0;
var sdk_core_1 = require("@uniswap/sdk-core");
var v3_sdk_1 = require("@uniswap/v3-sdk");
var ethers_1 = require("ethers");
var uniswapPoolAbi = [
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount",
                type: "uint128"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
        ],
        name: "Burn",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: false,
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount0",
                type: "uint128"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount1",
                type: "uint128"
            },
        ],
        name: "Collect",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount0",
                type: "uint128"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount1",
                type: "uint128"
            },
        ],
        name: "CollectProtocol",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paid0",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "paid1",
                type: "uint256"
            },
        ],
        name: "Flash",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint16",
                name: "observationCardinalityNextOld",
                type: "uint16"
            },
            {
                indexed: false,
                internalType: "uint16",
                name: "observationCardinalityNextNew",
                type: "uint16"
            },
        ],
        name: "IncreaseObservationCardinalityNext",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160"
            },
            {
                indexed: false,
                internalType: "int24",
                name: "tick",
                type: "int24"
            },
        ],
        name: "Initialize",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "owner",
                type: "address"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                indexed: true,
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "amount",
                type: "uint128"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                indexed: false,
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
        ],
        name: "Mint",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: false,
                internalType: "uint8",
                name: "feeProtocol0Old",
                type: "uint8"
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "feeProtocol1Old",
                type: "uint8"
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "feeProtocol0New",
                type: "uint8"
            },
            {
                indexed: false,
                internalType: "uint8",
                name: "feeProtocol1New",
                type: "uint8"
            },
        ],
        name: "SetFeeProtocol",
        type: "event"
    },
    {
        anonymous: false,
        inputs: [
            {
                indexed: true,
                internalType: "address",
                name: "sender",
                type: "address"
            },
            {
                indexed: true,
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                indexed: false,
                internalType: "int256",
                name: "amount0",
                type: "int256"
            },
            {
                indexed: false,
                internalType: "int256",
                name: "amount1",
                type: "int256"
            },
            {
                indexed: false,
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160"
            },
            {
                indexed: false,
                internalType: "uint128",
                name: "liquidity",
                type: "uint128"
            },
            {
                indexed: false,
                internalType: "int24",
                name: "tick",
                type: "int24"
            },
        ],
        name: "Swap",
        type: "event"
    },
    {
        inputs: [
            {
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                internalType: "uint128",
                name: "amount",
                type: "uint128"
            },
        ],
        name: "burn",
        outputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                internalType: "uint128",
                name: "amount0Requested",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "amount1Requested",
                type: "uint128"
            },
        ],
        name: "collect",
        outputs: [
            {
                internalType: "uint128",
                name: "amount0",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "amount1",
                type: "uint128"
            },
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                internalType: "uint128",
                name: "amount0Requested",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "amount1Requested",
                type: "uint128"
            },
        ],
        name: "collectProtocol",
        outputs: [
            {
                internalType: "uint128",
                name: "amount0",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "amount1",
                type: "uint128"
            },
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "factory",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "fee",
        outputs: [
            {
                internalType: "uint24",
                name: "",
                type: "uint24"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "feeGrowthGlobal0X128",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "feeGrowthGlobal1X128",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            },
        ],
        name: "flash",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint16",
                name: "observationCardinalityNext",
                type: "uint16"
            },
        ],
        name: "increaseObservationCardinalityNext",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160"
            },
        ],
        name: "initialize",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "liquidity",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "maxLiquidityPerTick",
        outputs: [
            {
                internalType: "uint128",
                name: "",
                type: "uint128"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
            {
                internalType: "uint128",
                name: "amount",
                type: "uint128"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            },
        ],
        name: "mint",
        outputs: [
            {
                internalType: "uint256",
                name: "amount0",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "amount1",
                type: "uint256"
            },
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint256",
                name: "index",
                type: "uint256"
            },
        ],
        name: "observations",
        outputs: [
            {
                internalType: "uint32",
                name: "blockTimestamp",
                type: "uint32"
            },
            {
                internalType: "int56",
                name: "tickCumulative",
                type: "int56"
            },
            {
                internalType: "uint160",
                name: "secondsPerLiquidityCumulativeX128",
                type: "uint160"
            },
            {
                internalType: "bool",
                name: "initialized",
                type: "bool"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint32[]",
                name: "secondsAgos",
                type: "uint32[]"
            },
        ],
        name: "observe",
        outputs: [
            {
                internalType: "int56[]",
                name: "tickCumulatives",
                type: "int56[]"
            },
            {
                internalType: "uint160[]",
                name: "secondsPerLiquidityCumulativeX128s",
                type: "uint160[]"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "bytes32",
                name: "key",
                type: "bytes32"
            },
        ],
        name: "positions",
        outputs: [
            {
                internalType: "uint128",
                name: "_liquidity",
                type: "uint128"
            },
            {
                internalType: "uint256",
                name: "feeGrowthInside0LastX128",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "feeGrowthInside1LastX128",
                type: "uint256"
            },
            {
                internalType: "uint128",
                name: "tokensOwed0",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "tokensOwed1",
                type: "uint128"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "protocolFees",
        outputs: [
            {
                internalType: "uint128",
                name: "token0",
                type: "uint128"
            },
            {
                internalType: "uint128",
                name: "token1",
                type: "uint128"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "uint8",
                name: "feeProtocol0",
                type: "uint8"
            },
            {
                internalType: "uint8",
                name: "feeProtocol1",
                type: "uint8"
            },
        ],
        name: "setFeeProtocol",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [],
        name: "slot0",
        outputs: [
            {
                internalType: "uint160",
                name: "sqrtPriceX96",
                type: "uint160"
            },
            {
                internalType: "int24",
                name: "tick",
                type: "int24"
            },
            {
                internalType: "uint16",
                name: "observationIndex",
                type: "uint16"
            },
            {
                internalType: "uint16",
                name: "observationCardinality",
                type: "uint16"
            },
            {
                internalType: "uint16",
                name: "observationCardinalityNext",
                type: "uint16"
            },
            {
                internalType: "uint8",
                name: "feeProtocol",
                type: "uint8"
            },
            {
                internalType: "bool",
                name: "unlocked",
                type: "bool"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "int24",
                name: "tickLower",
                type: "int24"
            },
            {
                internalType: "int24",
                name: "tickUpper",
                type: "int24"
            },
        ],
        name: "snapshotCumulativesInside",
        outputs: [
            {
                internalType: "int56",
                name: "tickCumulativeInside",
                type: "int56"
            },
            {
                internalType: "uint160",
                name: "secondsPerLiquidityInsideX128",
                type: "uint160"
            },
            {
                internalType: "uint32",
                name: "secondsInside",
                type: "uint32"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "address",
                name: "recipient",
                type: "address"
            },
            {
                internalType: "bool",
                name: "zeroForOne",
                type: "bool"
            },
            {
                internalType: "int256",
                name: "amountSpecified",
                type: "int256"
            },
            {
                internalType: "uint160",
                name: "sqrtPriceLimitX96",
                type: "uint160"
            },
            {
                internalType: "bytes",
                name: "data",
                type: "bytes"
            },
        ],
        name: "swap",
        outputs: [
            {
                internalType: "int256",
                name: "amount0",
                type: "int256"
            },
            {
                internalType: "int256",
                name: "amount1",
                type: "int256"
            },
        ],
        stateMutability: "nonpayable",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "int16",
                name: "wordPosition",
                type: "int16"
            },
        ],
        name: "tickBitmap",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "tickSpacing",
        outputs: [
            {
                internalType: "int24",
                name: "",
                type: "int24"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [
            {
                internalType: "int24",
                name: "tick",
                type: "int24"
            },
        ],
        name: "ticks",
        outputs: [
            {
                internalType: "uint128",
                name: "liquidityGross",
                type: "uint128"
            },
            {
                internalType: "int128",
                name: "liquidityNet",
                type: "int128"
            },
            {
                internalType: "uint256",
                name: "feeGrowthOutside0X128",
                type: "uint256"
            },
            {
                internalType: "uint256",
                name: "feeGrowthOutside1X128",
                type: "uint256"
            },
            {
                internalType: "int56",
                name: "tickCumulativeOutside",
                type: "int56"
            },
            {
                internalType: "uint160",
                name: "secondsPerLiquidityOutsideX128",
                type: "uint160"
            },
            {
                internalType: "uint32",
                name: "secondsOutside",
                type: "uint32"
            },
            {
                internalType: "bool",
                name: "initialized",
                type: "bool"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "token0",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
    {
        inputs: [],
        name: "token1",
        outputs: [
            {
                internalType: "address",
                name: "",
                type: "address"
            },
        ],
        stateMutability: "view",
        type: "function"
    },
];
var quoterAbi = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_factory",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_WETH9",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "WETH9",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "factory",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "path",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "name": "quoteExactInput",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenOut",
                "type": "address"
            },
            {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            },
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            },
            {
                "internalType": "uint160",
                "name": "sqrtPriceLimitX96",
                "type": "uint160"
            }
        ],
        "name": "quoteExactInputSingle",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "bytes",
                "name": "path",
                "type": "bytes"
            },
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            }
        ],
        "name": "quoteExactOutput",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "tokenIn",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "tokenOut",
                "type": "address"
            },
            {
                "internalType": "uint24",
                "name": "fee",
                "type": "uint24"
            },
            {
                "internalType": "uint256",
                "name": "amountOut",
                "type": "uint256"
            },
            {
                "internalType": "uint160",
                "name": "sqrtPriceLimitX96",
                "type": "uint160"
            }
        ],
        "name": "quoteExactOutputSingle",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "amountIn",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "int256",
                "name": "amount0Delta",
                "type": "int256"
            },
            {
                "internalType": "int256",
                "name": "amount1Delta",
                "type": "int256"
            },
            {
                "internalType": "bytes",
                "name": "path",
                "type": "bytes"
            }
        ],
        "name": "uniswapV3SwapCallback",
        "outputs": [],
        "stateMutability": "view",
        "type": "function"
    }
];
exports.POOL_FACTORY_CONTRACT_ADDRESS = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
exports.QUOTER_CONTRACT_ADDRESS = "0x61fFE014bA17989E743c5F6cB21bF9697530B21e";
var WETH_TOKEN = new sdk_core_1.Token(sdk_core_1.SUPPORTED_CHAINS[1], "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", 18, "WETH", "Wrapped Ether");
var USDC_TOKEN = new sdk_core_1.Token(sdk_core_1.SUPPORTED_CHAINS[1], "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", 6, "USDC", "USD//C");
// Example Configuration
exports.CurrentConfig = {
    rpc: {
        local: "http://localhost:8545",
        mainnet: "https://mainnet.infura.io/v3/0ac57a06f2994538829c14745750d721"
    },
    tokens: {
        "in": USDC_TOKEN,
        amountIn: 1000,
        out: WETH_TOKEN,
        poolFee: v3_sdk_1.FeeAmount.MEDIUM
    }
};
var currentPoolAddress = (0, v3_sdk_1.computePoolAddress)({
    factoryAddress: exports.POOL_FACTORY_CONTRACT_ADDRESS,
    tokenA: exports.CurrentConfig.tokens["in"],
    tokenB: exports.CurrentConfig.tokens.out,
    fee: exports.CurrentConfig.tokens.poolFee
});
// actual code starts here
exports.provider = new ethers_1.ethers.providers.JsonRpcProvider("http://localhost:8545");
exports.poolContract = new ethers_1.ethers.Contract(currentPoolAddress, uniswapPoolAbi, exports.provider);
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, token0, token1, fee, liquidity, slot0, quoterContract, quotedAmountOut;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    exports.poolContract.token0(),
                    exports.poolContract.token1(),
                    exports.poolContract.fee(),
                    exports.poolContract.liquidity(),
                    exports.poolContract.slot0(),
                ])];
            case 1:
                _a = _b.sent(), token0 = _a[0], token1 = _a[1], fee = _a[2], liquidity = _a[3], slot0 = _a[4];
                console.log(fee.toString());
                quoterContract = new ethers_1.ethers.Contract(exports.QUOTER_CONTRACT_ADDRESS, quoterAbi, exports.provider);
                console.log("Address1", token0, token1);
                return [4 /*yield*/, quoterContract.callStatic.quoteExactInputSingle(token0, token1, fee, ethers_1.ethers.utils.parseEther(exports.CurrentConfig.tokens.amountIn.toString()), 0)];
            case 2:
                quotedAmountOut = _b.sent();
                console.log("This is the output ", quotedAmountOut.toString());
                return [2 /*return*/];
        }
    });
}); };
// main();
