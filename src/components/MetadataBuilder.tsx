"use client";
import React, { useState, useEffect } from "react";
import { MintNFT } from "@c/MintNFT";

interface FormData {
  name: string;
  description: string;
}

export function MetadataBuilder({ onSuccessfulTokenUriCreation }) {
  const [isLoading, setIsLoading] = useState(false); // Added this state
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
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
        if (responseData.url) {
          setTokenURI(responseData.url);
          setIsRequestSuccessful(true);
        } else {
          setIsRequestSuccessful(false);
        }
      }
    } catch (error) {
      console.error("Error response from /api/mint:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <div className="space-loader-container text-2xl font-bold  text-gray-600">
          Storing your image on the <br />
          Interplanetary File System (IPFS)...
        </div>
      </div>
    );
  }

  if (isRequestSuccessful) {
    return <MintNFT onSuccessfulTokenUriCreation={tokenURI} />;
  } else {
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
            After clicking the "Store image on IPFS" button, your picture will
            be stored on IPFS a Decentralized and Persistent Storage System.
            <br />
          </label>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Store image on IPFS
          </button>
        </form>
      </div>
    );
  }
}
export default MetadataBuilder;
