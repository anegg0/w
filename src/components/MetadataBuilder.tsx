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
    <div>
      <h2>Create JSON Object</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Image:
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <h3>Resources</h3>
        {formData.resources.map((resource, index) => (
          <div key={index}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={resource.name}
                onChange={(e) => handleResourceChange(e, index)}
              />
            </label>
            <br />
            <label>
              URI:
              <input
                type="text"
                name="uri"
                value={resource.uri}
                onChange={(e) => handleResourceChange(e, index)}
              />
            </label>
            <br />
            <label>
              MIME Type:
              <input
                type="text"
                name="mime_type"
                value={resource.mime_type}
                onChange={(e) => handleResourceChange(e, index)}
              />
            </label>
            <br />
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={resource.description}
                onChange={(e) => handleResourceChange(e, index)}
              />
            </label>
            <br />
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
        >
          Add Resource
        </button>
        <br />
        <h3>Attributes</h3>
        {formData.attributes.map((attribute, index) => (
          <div key={index}>
            <label>
              Trait Type:
              <input
                type="text"
                name="trait_type"
                value={attribute.trait_type}
                onChange={(e) => handleAttributeChange(e, index)}
              />
            </label>
            <br />
            <label>
              Value:
              <input
                type="text"
                name="value"
                value={attribute.value}
                onChange={(e) => handleAttributeChange(e, index)}
              />
            </label>
            <br />
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
        >
          Add Attribute
        </button>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
