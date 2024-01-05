import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    polygon_mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.OWNER_PRIVATE_KEY as string],
    },

    skale_test: {
      url: "https://staging-v3.skalenodes.com/v1/staging-fast-active-bellatrix",
      accounts: [process.env.OWNER_PRIVATE_KEY as string],
    },

    skale: {
      url: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague	",
      accounts: [process.env.OWNER_PRIVATE_KEY as string],
    },
  },
  etherscan: {
    apiKey: process.env.POLYGONSCAN_API_KEY,
  },
};

export default config;
