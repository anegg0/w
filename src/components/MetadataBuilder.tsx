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
        <div className="action-prompt">
          Add a description to your image
          <div className="action-paragraph">
            There are no rules. Enter anything you like.
            <br />
            <br />
            After submitting this form, your picture will be stored on IPFS:
            <br />a Decentralized and Persistent Storage System.
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded shadow-md bg-gradient-to-b from-transparent to-[rgba(var(--background-end-rgb),1)]"
          >
            <label className="action-paragraph">
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
            <label className="action-paragraph">
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
                className="btn bg-orange-400 text-gray rounded-sm p-1"
              >
                Store image on IPFS
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
export default MetadataBuilder;
