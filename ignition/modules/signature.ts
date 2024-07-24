const hre = require("hardhat");

import { Test } from "../../typechain-types";

async function main() {
    const [signer] = await hre.ethers.getSigners();
    const signature = signer.signMessage(hre.ethers.getBytes(hre.ethers.id("weee")))
     
    const sig = await hre.ethers.getContractFactory("Test");

    const ecdsa = await sig.deploy(signature);
    console.log("address: ", await signer.getAddress())
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});