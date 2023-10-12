import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import { publicProvider } from "wagmi/providers/public";
import { WagmiConfig } from "wagmi";
import { sepolia } from "wagmi/chains";
import { goerli } from "wagmi/chains";

// 1. Get projectId
const projectId = "130c92c32b5cfbac34b8cff6780340e7";

// 2. Create wagmiConfig
const metadata = {
  name: "W",
  description: "Watermarking NFTs with verifiable ownership",
  icons: ["@a/logo.png"],
};
const chains = [goerli];
export const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
export const WalletModal = createWeb3Modal({ wagmiConfig, projectId, chains });
