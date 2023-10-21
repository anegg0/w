"use client";

import React, { useState } from "react";
import { BaseError } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useAccount } from "wagmi";
import { useDebounce } from "@s/hooks/useDebounce";
import { watermarkedConfig } from "@s/generated";
import { stringify } from "../utils/stringify";

export function MintNFT({ onSuccessfulTokenUriCreation }) {
  const [tokenURI, setTokenURI] = useState<string>(
    onSuccessfulTokenUriCreation,
  );
  console.log(`tokenURI at minNFT level is: ${tokenURI}`);
  const debouncedTokenUri = useDebounce(tokenURI);
  const { address } = useAccount();
  const debouncedCreatorAddress = useDebounce(address);

  const { config } = usePrepareContractWrite({
    ...watermarkedConfig,
    address: "0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D",
    functionName: "mintItem",
    args: [debouncedCreatorAddress, debouncedTokenUri],
    enabled: Boolean(debouncedTokenUri),
  });

  const { write, data, error, isLoading, isError } = useContractWrite(config);
  const {
    data: receipt,
    isLoading: isPending,
    isSuccess,
  } = useWaitForTransaction({ hash: data?.hash });

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold">Mint a Watermarked NFT</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <button
          disabled={!write}
          type="submit"
          className="my-4 px-4 py-2 rounded bg-blue-500 text-white disabled:opacity-50"
        >
          Mint
        </button>
      </form>
      {isPending && (
        <div className="popol-loader-container text-2xl font-bold  text-gray-400">
          Registering your creation on the Blockchain..
        </div>
      )}{" "}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </div>
  );
}
