import ReactDOM from "react-dom/client";
import App from "./App";
import { ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import { Web3ReactProvider } from "@web3-react/core";
import BlockchainUtils from "../src/uilts/Blockchain";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import React from "react";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <Web3ReactProvider getLibrary={BlockchainUtils.getLibrary}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </Web3ReactProvider>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
  </>
);
