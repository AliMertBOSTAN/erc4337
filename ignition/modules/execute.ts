const hre = require("hardhat");

import { AccountFactory } from "../../typechain-types";
import { EntryPoint } from "../../typechain-types/core";
import { UserOp } from "./Addrs";
import { Addrs } from "./Addrs";
import { addrs } from "./Addrs";

// şimidilik CREATE kullanılacak ilerleyen degilştirme aşamlarında CREATE2'ye çevirmek daha verimli olabilir
let FACTORY_NONCE = 1;
const FACTORY_ADDRESS ="0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"
const ENTRYPOINT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const PAYMASTER_ADDRESS = "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0"

async function main() {
  const EntryPoint = await hre.ethers.getContractAt("EntryPoint", ENTRYPOINT_ADDRESS) as EntryPoint; 
  
  const sender = await hre.ethers.getCreateAddress({
    from: FACTORY_ADDRESS,
    nonce: FACTORY_NONCE
  });
  
  const [signer0] = await hre.ethers.getSigners();
  const address0 = await signer0.getAddress();

  const AccountFactory = await hre.ethers.getContractFactory("AccountFactory");
  // const initCode = FACTORY_ADDRESS + AccountFactory.interface.encodeFunctionData("createAccount", [address0]).slice(2); // Account oluşturmak içim
  const initCode = "0x" // Account oluşturmadan işlem yapmak için
  
  // Burada deneme olarak Account üzerindeki execute fonksiyonunu çağırdık ileride CrocSwap fonksiyonları olarak güncellenebilir
  const Account = await hre.ethers.getContractFactory("Account");
  const callData = Account.interface.encodeFunctionData("execute")

  // sender adına deposit yapıyoruz
  // await EntryPoint.depositTo(sender, {value: hre.ethers.parseEther("100")})

  const UserOp: UserOp = {
    sender: sender,
    nonce: await EntryPoint.getNonce(sender, 0),
    initCode: initCode,
    callData: callData,
    callGasLimit: 400_000,
    verificationGasLimit: 400_000,
    preVerificationGas: 100_000,
    maxFeePerGas: hre.ethers.parseUnits("10", "gwei"),
    maxPriorityFeePerGas: hre.ethers.parseUnits("5", "gwei"),
    paymasterAndData: "0x",
    signature: "0x",
  };

  const userOpHash = await EntryPoint.getUserOpHash(UserOp);
  // kim imzalıyorsa ona göre ayarlanmalı
  const _signature = signer0.signMessage(hre.ethers.getBytes(userOpHash));
  UserOp.signature = _signature;

  console.log({sender})

  const tx = await EntryPoint.handleOps([UserOp], address0)
  const receipt = await tx.wait()
  console.log(receipt)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});