import { goerli, localhost } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, defineConfig } from "wagmi";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli, localhost],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "W",
  chains,
  projectId: "130c92c32b5cfbac34b8cff6780340e7",
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
