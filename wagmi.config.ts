import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { sepolia, goerli } from "wagmi/chains";
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
			chainId: goerli.id,
			contracts: [
				{
					name: "Watermarked",
					address: {
						[chains.goerli.id]: "0xAce963F9139ADD78730468bCc57fAA1812B2b5E2",
						[chains.sepolia.id]: "0xAce963F9139ADD78730468bCc57fAA1812B2b5E2",
					},
				},
			],
		}),
		react(),
	],
});
