"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import ActionContainer from "@c/ActionContainer";
import EncodedImage from "@a/encoded/encoded_image.png";
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
  const steps = ["Upload Image", "Sign Image", "Define Image", "Mint Image"];
  const currentStep = 0;
  const id = "upload";

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
    <div className="container">
      <StepProgressBar steps={steps} currentStep={currentStep} />
      {file ? (
        <>
          <div className="action-prompt">
            This is your image. Like What You See?
          </div>
          <div className="image-preview">
            <Image
              src={previewUrl}
              width={550}
              height={550}
              alt="Preview"
              unoptimized={true}
            />
          </div>
          <div className="action-buttons">
            <button
              onClick={handleRemove}
              className="btn bg-gray-400 text-gray rounded-sm p-1"
            >
              Remove
            </button>
            <button
              onClick={handleUpload}
              className="btn bg-orange-400 text-gray rounded-sm p-1"
            >
              Upload
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="action-prompt">
            Get started by uploading your file (PNG)
          </div>
          <div className="input-wrapper">
            <input
              type="file"
              name="file"
              required
              onChange={handleFileChange}
              accept=".png"
              className="mt-4"
            />
          </div>
          <div className="action-buttons">
            <button
              onClick={handleUpload}
              className="btn bg-orange-400 text-gray rounded-sm p-1"
            >
              Upload
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default ToEncodeFileUploader;
