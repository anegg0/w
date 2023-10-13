import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { goerli } from "wagmi/chains";
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
						[chains.goerli.id]: "0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D",
					},
				},
			],
		}),
		react(),
	],
});
