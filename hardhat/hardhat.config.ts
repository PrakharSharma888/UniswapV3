import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.7.6",
    settings: {
      evmVersion: "istanbul",
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  networks: {
    hardhat: {
      forking: {
        enabled: true,
        url: "https://rpc.ankr.com/eth",
      },
    },
  },
};

export default config;
