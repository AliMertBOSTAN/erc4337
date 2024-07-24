import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.19",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  networks: {
    sepolia:{
      url:"57zyWaTwjRAL415JM2yJYj3mNdZ9PWwV",
      accounts: ["0x7c5e2cfbba7b00ba95e5ed7cd80566021da709442e147ad3e08f23f5044a3d5a"]
    }
  },
  defaultNetwork: "localhost",
};

export default config;
