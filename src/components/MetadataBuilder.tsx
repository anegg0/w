"use client";
import React, { useState, useEffect } from "react";
import { MintNFT } from "@c/MintNFT";
import EncodeStepProgressBar from "@c/EncodeStepProgressBar";

interface FormData {
  name: string;
  description: string;
}

export function MetadataBuilder({ onSuccessfulTokenUriCreation }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSuccessful, setIsRequestSuccessful] = useState(false);
  const [tokenURI, setTokenURI] = useState("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
  });
  const steps = ["Upload Image", "Sign Image", "Define Image", "Mint Image"];
  const currentStep = 2;
  const id = "metadata-builder";

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
      const response = await fetch("/api/ipfs", {
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
      console.error("Error response from /api/ipfs:", error);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <EncodeStepProgressBar steps={steps} currentStep={currentStep} />
        <div className="space-loader-container text-2xl font-bold  text-gray-200">
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
      <div className="container">
        <EncodeStepProgressBar steps={steps} currentStep={currentStep} />
        <div className="action-prompt">Add a description to your image</div>
        <div className="action-paragraph">
          Enter anything you like. After submitting this form,
          <br /> your picture will be stored on IPFS: a Decentralized and
          Persistent Storage System.
        </div>
        <form
          onSubmit={handleSubmit}
          className="p-6 rounded shadow-md bg-gradient-to-b from-transparent to-[rgba(var(--background-end-rgb),1)]"
        >
          <label className="block text-sm font-medium text-gray-200">
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
          <label className="block text-sm font-medium text-neutral-200">
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
          <br />
          <div className="action-buttons">
            <button
              type="submit"
              className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-white transition duration-500 ease-in-out transform bg-blue-600 rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Store image on IPFS
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default MetadataBuilder;
