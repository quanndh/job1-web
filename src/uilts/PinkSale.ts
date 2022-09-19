import { ethers } from "ethers";
import { hexlify } from "ethers/lib/utils";
import { Job } from "../pages/PreSale/Sale";

const abi = [
  {
    inputs: [],
    name: "poolSettings",
    outputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "currency",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "endTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "softCap",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "hardCap",
        type: "uint256",
      },
      {
        internalType: "uint128",
        name: "ethFeePercent",
        type: "uint128",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "contribute",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
];

export class PinkSale {
  static getInfo = async (contract: string, providerUrl?: string) => {
    const provider = new ethers.providers.StaticJsonRpcProvider(
      providerUrl ?? `https://bsc-dataseed1.binance.org/`
    );
    const presale = new ethers.Contract(contract, abi, provider);
    const data = await presale.poolSettings();

    return data.startTime.toNumber();
    //buy: presale.contribute()
  };

  static buy = async (wallet: ethers.Wallet, job: Job) => {
    try {
      const provider = new ethers.providers.StaticJsonRpcProvider(
        `https://bsc-dataseed2.binance.org/`
      );

      let presale = new ethers.Contract(job.contract, abi, provider);
      presale = presale.connect(wallet);

      const nonce = await provider.getTransactionCount(wallet.address);

      const tx = await presale.populateTransaction.contribute({
        value: ethers.utils.parseEther(String(job.value)),
        gasLimit: String(job.gasLimit),
        gasPrice: ethers.utils.parseUnits(String(job.gasPrice), "gwei"),
        nonce,
      });

      const signTx = await wallet.signTransaction(tx);

      const hexTx = await Promise.resolve(signTx).then((t) => hexlify(t));
      const hash = await provider.perform("sendTransaction", {
        signedTransaction: hexTx,
      });
      console.log(hash);
      return true;
    } catch (error: any) {
      return error.message;
    }
  };
}
