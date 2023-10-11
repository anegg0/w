import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { mainnet, sepolia } from "wagmi/chains";
import * as chains from "wagmi/chains";

export default defineConfig({
	out: "src/generated.ts",
	contracts: [],
	env: [
		loadEnv({
			mode: process.env.NODE_ENV,
			envDir: process.cwd(),
		}),
	],
	plugins: [
		etherscan({
			apiKey: process.env.ETHERSCAN_API_KEY!,
			chainId: sepolia.id,
			contracts: [
				{
					name: "WagmiMintExample",
					address: {
						[chains.sepolia.id]: "0xd53Aaa098e02620b1EbfacCCba301f122fC595d1",
					},
				},
			],
		}),
		react(),
	],
});
