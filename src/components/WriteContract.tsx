"use client";

import React, { useState } from "react";
import { BaseError } from "viem";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "@s/hooks/useDebounce";
import { watermarkedConfig } from "@s/generated";
import { stringify } from "../utils/stringify";

export function WriteContractPrepared() {
  const [tokenUri, setTokenUri] = React.useState("");
  const debouncedTokenUri = useDebounce(tokenUri);

  const { config } = usePrepareContractWrite({
    ...watermarkedConfig,
    // address: "0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D",
    functionName: "mintItem",
    args: [debouncedTokenUri],
  });
  console.log(`watermarkedConfig is: ${watermarkedConfig}`);
  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        write?.();
      }}
    >
      <label for="tokenUri">Token URI</label>
      <input
        id="tokenUri"
        onChange={(e) => setTokenUri(e.target.value)}
        placeholder="420"
        value={tokenUri}
        style={{ color: "black" }}
      />
      <button disabled={!write || isLoading}>
        {isLoading ? "Minting..." : "Mint"}
      </button>
      {isSuccess && (
        <div>
          Successfully minted your NFT!
          <div>
            <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
          </div>
        </div>
      )}
      {(isPrepareError || isError) && (
        <div>Error: {(prepareError || error)?.message}</div>
      )}
    </form>
  );
}

export default WriteContractPrepared;
