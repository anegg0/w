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
						[chains.mainnet.id]: "0xEf40F59aeA57997D5A4CEb7af089baCba10d01CA",
						[chains.goerli.id]: "0xEf40F59aeA57997D5A4CEb7af089baCba10d01CA",
					},
				},
			],
		}),
		react(),
	],
});
