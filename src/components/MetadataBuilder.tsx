"use client";

import { useState } from "react";

interface Resource {
  name: string;
  uri: string;
  mime_type: string;
  description: string;
}

interface Attribute {
  trait_type: string;
  value: string;
}

interface FormData {
  name: string;
  description: string;
  image: string;
  resources: Resource[];
  attributes: Attribute[];
}

export function MetadataBuilder() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: "",
    resources: [
      {
        name: "",
        uri: "",
        mime_type: "",
        description: "",
      },
    ],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleResourceChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedResources = [...formData.resources];
    updatedResources[index][name] = value;
    setFormData({
      ...formData,
      resources: updatedResources,
    });
  };

  const handleAttributeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const updatedAttributes = [...formData.attributes];
    updatedAttributes[index][name] = value;
    setFormData({
      ...formData,
      attributes: updatedAttributes,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(JSON.stringify(formData, null, 2));
  };

  return (
    <div className="min-h-screen p-10">
      <h2 className="text-2xl font-bold mb-6">Create JSON Object</h2>{" "}
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
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            />
          </label>
          <label className="block text-sm font-medium mb-2">
            Image:
            <input
              type="text"
              name="image"
              id="name"
              value={formData.image}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
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
          type="button"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Mint image as NFT
        </button>
      </form>
    </div>
  );
}
