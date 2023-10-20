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
  ); /* const tokenURI = (uri) => {
   *   setURI(uri);
   * };
   */
  console.log(`tokenURI at minNFT level is: ${tokenURI}`);
  const debouncedTokenUri = useDebounce(tokenURI); // Directly debounce the tokenURI
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
    <>
      {isLoading && <div>Check wallet...</div>}
      {isPending && <div>Transaction pending...</div>}
      {isSuccess && (
        <>
          <div>Transaction Hash: {data?.hash}</div>
          <div>
            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
          </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
    </>
  );
}
