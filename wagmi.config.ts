import { defineConfig, loadEnv } from "@wagmi/cli";
import { etherscan, react } from "@wagmi/cli/plugins";
import { erc20ABI } from "wagmi";
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
						[chains.sepolia.id]: "0xFe04316F6608dD7021ca384d23b24A5399b6bfA8",
					},
				},
			],
		}),
		react(),
	],
});
