const hre = require("hardhat");

import { AccountFactory } from "../../typechain-types";

async function main() {
  const af = await hre.ethers.deployContract("AccountFactory") as AccountFactory;

  await af.waitForDeployment();

  console.log(`AF deployed to ${af.target}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});