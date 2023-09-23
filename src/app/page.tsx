"use client";

import React from "react";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { goerli } from "wagmi/chains";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { alchemyProvider } from "wagmi/providers/alchemy";

// Configure the blockchain providers and chains to use

// Export the App component as the default export
export default function App({ Component, pageProps }) {
  return (
    // Set up the Wagmi configuration for the app
    <WagmiConfig client={WagmiConfig}>
      {/* Set up the RainbowKit provider for the app */}
      <RainbowKitProvider chains={chains}>
        {/* Render the specified component with its page props */}
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
