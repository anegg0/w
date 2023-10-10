import { sepolia, mainnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig } from "wagmi";
import { localhost } from "./localhostChain";
const walletConnectProjectId = "130c92c32b5cfbac34b8cff6780340e7";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    localhost,
    ...(process.env.NODE_ENV === "development" ? [sepolia] : [sepolia]),
    // [sepolia],
  ],
  [publicProvider()],
);

const { connectors } = getDefaultWallets({
  appName: "W",
  chains,
  projectId: walletConnectProjectId,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export { chains };
