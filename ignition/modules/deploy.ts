const hre = require("hardhat");

import { AccountFactory, Paymaster } from "../../typechain-types";
import { EntryPoint } from "../../typechain-types/core";

import { Addrs } from "./Addrs";
import { addrs } from "./Addrs";

async function main() {
    const ep = await hre.ethers.deployContract("EntryPoint") as EntryPoint; 
    await ep.waitForDeployment();
    addrs.EntryPoint = ep.target.toString();
    console.log(`EP deployed to ${ep.target}`);


    const af = await hre.ethers.deployContract("AccountFactory") as AccountFactory;
    await af.waitForDeployment();
    addrs.Factory = af.target.toString();
    console.log(`AF deployed to ${af.target}`);

    const pm = await hre.ethers.deployContract("Paymaster") as Paymaster; 
    await pm.waitForDeployment();
    addrs.PayMaster = pm.target.toString();
    console.log(`PM deployed to ${pm.target}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});