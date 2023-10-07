"use client";

import React, { useState } from "react";
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";

interface FormData {
  name: string;
  description: string;
}

function MintNFTForm({ tokenURI }) {
  /* const [tokenId, setTokenId] = React.useState(""); */
  /* const debouncedTokenId = useDebounce(tokenId); */

  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: "0xEf40F59aeA57997D5A4CEb7af089baCba10d01CA",
    abi: [
      {
        name: "mintNFT",
        type: "function",
        stateMutability: "nonpayable",
        inputs: [{ internalType: "string", name: "tokenURI", type: "string" }],
        outputs: [],
      },
    ],
    functionName: "mintNFT",
    args: tokenURI,
  });
  const { data, error, isError, write } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    console.log("tokenURI:", tokenURI),
    {
      /* <div>
        {isSuccess && (
        <div>
        Successfully minted your NFT!
        <div>
        <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
        </div>
        </div>
        )}
        </div> */
    }
  );
}

export function MetadataBuilder({ onSuccessfulMetadataCreation }) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/mint", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        /* onSuccessfulMetadataCreation(4); */
        const tokenURI = response
          .json()
          .then((data) => console.log(`tokenURI is: ${data.url}`));
        await console.log("tokenuri:", tokenuri);
        await MintNFTForm(tokenURI);
      }
    } catch (error) {
      console.error("Error minting NFT:", error);
    }
  };

  return (
    <div className="min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Create JSON Object</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md bg-gradient-to-b from-transparent to-[rgba(var(--background-end-rgb),1)]"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Name:
            <input
              placeholder="Short description of your image"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-500"
            />
          </label>
          <label className="block text-sm font-medium mb-2">
            Description:
            <input
              type="text"
              placeholder="Longer description of your image"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded text-gray-500"
            />
          </label>
        </div>
        <br />
        <label className="block text-md font-medium mb-2">
          You can now mint your watermarked image as an NFT.
          <br />
          After clicking the "Mint image as NFT" button, your wallet will ask
          you to confirm the transaction.
          <br />
          <br />
          Once confirmed, your will have verifiable proof that you registered
          your image on the blockchain:
          <br />
        </label>
        <button
          type="submit" // Changed to submit
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mint image as NFT
        </button>
      </form>
    </div>
  );
}

export default MetadataBuilder;
