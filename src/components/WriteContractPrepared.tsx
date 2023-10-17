"use client";

// import { watermarkedAddress } from "wagmi";
import { useState } from "react";
import { BaseError } from "viem";
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import {useAccount} from 'wagmi';
import { useDebounce } from "@s/hooks/useDebounce";
import { watermarkedConfig } from "@s/generated";
import { stringify } from "../utils/stringify";
export function WriteContractPrepared() {
const [tokenUri, setTokenUri] = useState("");
const debouncedTokenUri = useDebounce(tokenUri);
const { address } = useAccount();
const debouncedCreatorAddress = useDebounce(address);

const { config } = usePrepareContractWrite({
  ...watermarkedConfig,
  address: '0x6CC2c4e0ECfcB06e6ac4FE7D760444588F74470D',
  functionName: "mintItem",
  args: [debouncedCreatorAddress,debouncedTokenUri],
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
      <h3>Mint a Watermarked NFT</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          write?.();
        }}
      >
        <input
          placeholder="token URI"
          onChange={(e) => setTokenUri(e.target.value)}
        />
        <button disabled={!write} type="submit">
          Mint
        </button>
      </form>

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
