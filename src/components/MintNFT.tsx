"use client";
import React, { useState, useEffect } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { useDebounce } from "@c/useDebounce";

interface MintNFTProps {
  tokenURI: string;
}

export function MintNFT({ tokenURI }: MintNFTProps) {
  const [localTokenURI, setLocalTokenURI] = useState<string | null>(null);

  const debouncedTokenUri = useDebounce(localTokenURI);

  useEffect(() => {
    if (tokenURI) {
      setLocalTokenURI(tokenURI);
    }
  }, [tokenURI]);

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xAce963F9139ADD78730468bCc57fAA1812B2b5E2",
    abi: [
      {
        name: "mintItem",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
        outputs: [],
      },
    ],
    functionName: "mintItem",
    args: [debouncedTokenUri],
    enabled: Boolean(debouncedTokenUri),
    gas: 1_000_000n,
  });

  const { data, error, isError } = useContractWrite(config);
  const { isLoading, isSuccess } = useWaitForTransaction({ hash: data?.hash });

  if (!localTokenURI) return <div>Loading...</div>;

  return (
    <div>
      {isLoading ? "Minting..." : "Mint"}
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
    </div>
  );
}

export default MintNFT;
