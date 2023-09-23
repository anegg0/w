import "dotenv/config";
import { configureChains, createConfig } from "wagmi";
import { goerli, mainnet } from "wagmi/chains";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { publicProvider } from "wagmi/providers/public";
import { alchemyProvider } from "wagmi/providers/alchemy";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [
    alchemyProvider({ apiKey: "Tsg7s-QM2dz5O3pPqLAH-FUL1zTtk0FS" }),
    publicProvider(),
  ]
);
const projectId = "130c92c32b5cfbac34b8cff6780340e7";
const { wallets } = getDefaultWallets({
  appName: "W",
  projectId,
  chains,
});
const connector = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);
export const WagmiConfig = createConfig({
  autoConnect: true,
  connectors: [connector],
  publicClient,
  webSocketPublicClient,
});
