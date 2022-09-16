import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Web3ReactProvider } from "@web3-react/core";
import BlockchainUtils from "../src/uilts/Blockchain";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Web3ReactProvider getLibrary={BlockchainUtils.getLibrary}>
      <App />
    </Web3ReactProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  </>
);
