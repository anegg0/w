"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import ActionContainer from "@c/ActionContainer";
import EncodedImage from "@a/encoded/encoded_image.png";
import Link from "next/link";
import Header from "@c/Header";
import Footer from "@c/Footer";
import "@a/globals.css";
import VerifyStepProgressBar from "@c/VerifyStepProgressBar";

export function Page({ onSuccessfulUpload }) {
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
    <>
      <Header />
      <div className="container">
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
            <div className="action-prompt">Verify an Image (PNG)</div>
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
      <Footer />
    </>
  );
}
export default Page;
