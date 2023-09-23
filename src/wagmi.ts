import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

import { publicProvider } from "wagmi/providers/public";

const walletConnectProjectId = "130c92c32b5cfbac34b8cff6780340e7";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, ...(process.env.NODE_ENV === "development" ? [goerli] : [])],
  [publicProvider()]
);

export const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: walletConnectProjectId,
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});
