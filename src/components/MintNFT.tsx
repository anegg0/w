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
import { useNetwork } from 'wagmi';
import axios from 'axios';
import Image from "next/image";
import EncodedImage from "@a/encoded/encoded_image.png"
import StepProgressBar from "@c/StepProgressBar";


export function MintNFT({ onSuccessfulTokenUriCreation }) {
  const [tokenURI, setTokenURI] = useState<string>(
    onSuccessfulTokenUriCreation,
  );
  // console.log(`tokenURI at minNFT level is: ${tokenURI}`);
  const debouncedTokenUri = useDebounce(tokenURI);
  const { address } = useAccount();
  const debouncedCreatorAddress = useDebounce(address);
  const { chain, chains } = useNetwork();
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
  const steps = ["Upload Image", "Sign Image", "Define Image", "Mint Image"];
  const currentStep = 3;
  const id = "mint";

  return (
    <div className="p-4">
      {!isSuccess && ( // This will render the content inside only if isSuccess is false
        <>

    <div className="container">

      <StepProgressBar steps={steps} currentStep={currentStep} />

          <div className="action-prompt">
            Mint a Watermarked NFT
          </div>
          <div className="action-paragraph">
            You can now mint your watermarked image as an NFT.<br/>
            After clicking "Mint", your wallet will require you to confirm<br/>
          </div>
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
          </div>
        </>
      )}
      {isPending && (
        <div className="loader-container">
          <div className="popol-loader-container text-2xl font-bold text-white">
            Carving your Image Into the Blockchain..
          </div>
        </div>
      )}
      {isSuccess && (
        <>
  <StepProgressBar steps={steps} currentStep={4} />
        <div className="flex flex-col items-center justify-center space-y-4">
            <div className="action-prompt text-center">
                Successfully minted your NFT
            </div>
            <a
                href={`https://${chain.name}.etherscan.io/tx/${data?.hash}`}
                className="text-blue-500 font-normal text-center"
            >
                Follow this Etherscan link to spot your NFT on the {chain.name} chain
            </a>
        </div>
        <div className="flex justify-center mt-4">
            <div className="image-preview">
                <Image src={EncodedImage} width={500} height={500} alt="watermarked image"/>
            </div>
        </div>
        </>
      )}
      {isError && <div>{(error as BaseError)?.shortMessage}</div>}
  </div>
  )
}
