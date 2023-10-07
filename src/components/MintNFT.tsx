"use client";
import { useState, useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

import {
  usePrepareWagmiMintExampleMint,
  useWagmiMintExampleMint,
} from "../generated";

export function MintNFT() {
  const [tokenId, setTokenId] = useState("");
  const [nftUrl, setNftUrl] = useState("");

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareWagmiMintExampleMint({
    args: tokenId ? [BigInt(tokenId)] : undefined,
  });
  const { data, error, isError, write } = useWagmiMintExampleMint(config);

  useEffect(() => {
    if (data && data.result) {
      const nftResult = data.result;
      setNftUrl(nftResult.url);
    }
  }, [data]);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div className="flex flex-col items-center">
      <input
        className="border border-gray-300 rounded-md px-2 py-1 mb-4 text-gray-500"
        onChange={(e) => setTokenId(e.target.value)}
        placeholder="Token ID (optional)"
        value={tokenId}
      />
      <button
        disabled={!write || isLoading}
        onClick={() => write?.()}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
          isLoading ? "opacity-50 cursor-wait" : ""
        }`}
      >
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div className="mt-4 p-2 bg-green-200 rounded-md">
          Successfully minted your NFT!
          <div>
            <a
              href={`https://etherscan.io/tx/${data?.hash}`}
              className="text-blue-500 underline"
            >
              Etherscan
            </a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div className="mt-4 p-2 bg-red-200 rounded-md">
          Error: {(prepareError || error)?.message}
        </div>
      )}
    </div>
  );
}
export default MintNFT;
