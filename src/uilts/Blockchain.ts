import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import moment from "moment";
import { Const } from "../constants";
import { Job } from "../pages/PreSale/Sale";
import { ApeSale } from "./ApeSale";
import LogUtils from "./Log";
import { PinkSale } from "./PinkSale";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;
const keyRegex = /^([a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

class BlockchainUtils {
  static library: Web3Provider;
  private processedIds: Set<number> = new Set();

  getLibrary = (provider: any) => {
    if (!BlockchainUtils.library) {
      BlockchainUtils.library = new Web3Provider(provider, "any");
      BlockchainUtils.library.pollingInterval = 12000;
    }
    return BlockchainUtils.library;
  };

  getProvider = (chainId: number) => {
    let rpc = Const.RPC_56;
    if (chainId === 97) {
      rpc = Const.RPC_97;
    }

    return new ethers.providers.StaticJsonRpcProvider(rpc);
  };

  formatAddress = (address: string) => {
    const match = address.match(truncateRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  formatKey = (address: string) => {
    const match = address.match(keyRegex);
    if (!match) return address;
    return `${match[1]}…${match[2]}`;
  };

  explorerLink = (address: string) => {
    const url =
      Const.CHAIN_ID === 56
        ? "https://bscscan.com/address/"
        : "https://testnet.bscscan.com/address/";

    return url + address;
  };

  processJobs = async (jobs: Job[], presale: "apesale" | "pinksale") => {
    const res: any = [];
    for (const job of jobs) {
      if (!this.processedIds.has(job.id)) {
        const wallet = new ethers.Wallet(job.privateKey);

        let buyRes: any;
        if (presale === "apesale") {
          buyRes = await ApeSale.buy(wallet, job);
        }
        if (presale === "pinksale") {
          buyRes = await PinkSale.buy(wallet, job);
        }

        if (buyRes === true) {
          res.push({ id: job.id, status: "Success" });
        } else {
          res.push({ id: job.id, status: "Error", content: buyRes });
        }

        this.processedIds.add(job.id);
      }
    }

    return res;
  };

  getPresaleStartTime = async (
    presale: "apesale" | "pinksale",
    contract: string,
    rpc?: string
  ) => {
    if (presale === "apesale") {
      return await ApeSale.getInfo(contract, rpc);
    }
    if (presale === "pinksale") {
      return await PinkSale.getInfo(contract, rpc);
    }
  };
}

export default new BlockchainUtils();
