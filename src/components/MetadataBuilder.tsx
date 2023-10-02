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
    attributes: [
      {
        trait_type: "",
        value: "",
      },
      {
        trait_type: "",
        value: "",
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
      <h2 className="text-2xl font-bold mb-6">Create JSON Object</h2>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded shadow-md bg-gradient-to-b from-transparent to-[rgba(var(--background-end-rgb),1)]"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name:
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="description"
          >
            Description:
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="image">
            Image:
          </label>
          <input
            type="text"
            name="image"
            id="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <h3 className="text-xl font-semibold mb-4">Resources</h3>
        {formData.resources.map((resource, index) => (
          <div key={index} className="mb-4">
            <div className="mb-2">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor={`resource_name_${index}`}
              >
                Name:
              </label>
              <input
                type="text"
                name="name"
                id={`resource_name_${index}`}
                value={resource.name}
                onChange={(e) => handleResourceChange(e, index)}
                className="w-full p-2 border rounded"
              />
            </div>

            {/* ... Repeat similar div structure for URI, MIME Type, and Description ... */}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              resources: [...formData.resources, {}],
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Resource
        </button>

        <h3 className="text-xl font-semibold mt-6 mb-4">Attributes</h3>
        {formData.attributes.map((attribute, index) => (
          <div key={index} className="mb-4">
            {/* ... Structured similarly to the "Resources" inputs ... */}
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            setFormData({
              ...formData,
              attributes: [...formData.attributes, {}],
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
        >
          Add Attribute
        </button>

        <div className="mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-[rgba(var(--foreground-rgb),0.1)] text-[rgba(var(--foreground-rgb),1)] rounded hover:bg-[rgba(var(--foreground-rgb),0.2)]"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
