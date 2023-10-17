"use client";
import React, { useState } from "react";
import { MintNFT } from "@c/MintNFT";

interface FormData {
  name: string;
  description: string;
}
export function MetadataBuilder({
  onSuccessfulMetadataCreation,
}: MetadataBuilderProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const [tokenURI, setTokenURI] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
        const responseData = await response.json();
        if (responseData && responseData.url) {
          setTokenURI(responseData.url);
          console.log(`tokenURI on Metadata is: ${responseData.url}`);
          let tokenURI = responseData.url;
          MintNFT(tokenURI);
          /* onSuccessfulMetadataCreation(tokenURI); // Pass tokenURI as argument */
          onSuccessfulMetadataCreation(4); // Pass tokenURI as argument
        }
      }
    } catch (error) {
      console.error("Error response from /api/mint:", error);
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
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mint image as NFT
        </button>
      </form>
      {/* {tokenURI && <MintNFT tokenUri={tokenUri} />} */}
    </div>
  );
}
export default MetadataBuilder;
