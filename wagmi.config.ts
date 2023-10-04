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
			chainId: mainnet.id,
			contracts: [
				{
					name: "WagmiMintExample",
					address: {
						[chains.mainnet.id]: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
						[chains.goerli.id]: "0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2",
					},
				},
			],
		}),
		react(),
	],
});
