import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { Const } from "../constants";

const RPC_URLS: { [chainId: number]: string } = {
  97: Const.RPC_97 as string,
  56: Const.RPC_56 as string,
};

export const Injected = new InjectedConnector({
  supportedChainIds: [97, 56, 1, 3, 4, 5, 42],
});

// export const walletconnect = new WalletConnectConnector({
//   rpc: RPC_URLS,
//   chainId: 1,
//   bridge: "https://bridge.walletconnect.org",
//   qrcode: true,
// });

export enum ConnectorNames {
  Injected = "Injected",
  // WalletConnect = "WalletConnect",
}

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: Injected,
  // [ConnectorNames.WalletConnect]: walletconnect,
};
