"use client";
import * as React from "react";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { chains, wagmiConfig } from "@s/wagmi";
import { WagmiConfig } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return <WagmiConfig config={wagmiConfig}>{mounted && children}</WagmiConfig>;
}
