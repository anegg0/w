"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import StepProgressBar from "@c/StepProgressBar";

export function ToEncodeFileUploader({ onSuccessfulUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/file/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        onSuccessfulUpload(2);
      } else {
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <>
      <StepProgressBar
        id="upload"
        steps={[
          "Upload Picture",
          "Add Signature",
          "Add Picture Info",
          "Publish Picture Onchain",
        ]}
        currentStep={0}
      />

      <div className="main-container">
        <div className="mb-4 text-lg font-bold rounded-lg">
          {file ? "File Preview" : "Get started by uploading your file (PNG)"}
        </div>
        {file ? (
          <div>
            <Image src={previewUrl} alt="Preview" width="600" height="600" />
            <button
              onClick={handleRemove}
              className="block mt-4 px-3 py-2 bg-gray-400 text-gray rounded-sm"
            >
              Remove
            </button>
            <button
              onClick={handleUpload}
              className="block mt-4 px-3 py-2 bg-orange-400 text-gray rounded-sm"
            >
              Upload
            </button>
          </div>
        ) : (
          <div>
            <input
              type="file"
              name="file"
              required
              onChange={handleFileChange}
              accept=".png"
            />
            <button
              onClick={handleUpload}
              className="block mt-4 px-3 py-2 bg-orange-400 text-gray rounded-sm"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default ToEncodeFileUploader;
