const hre = require("hardhat");

import { EntryPoint } from "../../typechain-types";

async function main() {
  const ep = await hre.ethers.deployContract("EntryPoint") as EntryPoint; 

  await ep.waitForDeployment();

  console.log(`EP deployed to ${ep.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});