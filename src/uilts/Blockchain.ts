import { Web3Provider } from "@ethersproject/providers";
import { ethers } from "ethers";
import { Const } from "../constants";

const truncateRegex = /^(0x[a-zA-Z0-9]{4})[a-zA-Z0-9]+([a-zA-Z0-9]{4})$/;

class BlockchainUtils {
  static library: Web3Provider;

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
}

export default new BlockchainUtils();
