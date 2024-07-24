export interface Addrs {
    EntryPoint: string | undefined,
    Factory: string | undefined,
    PayMaster: string,
    usdc: string |undefined
}

export let addrs : Addrs = {
    EntryPoint: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Factory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    PayMaster: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
    usdc: undefined
}

export interface UserOp {
    sender: any
    nonce: any
    initCode: any
    callData: any
    callGasLimit: any
    verificationGasLimit: any
    preVerificationGas: any
    maxFeePerGas: any
    maxPriorityFeePerGas: any
    paymasterAndData: any
    signature: any
}