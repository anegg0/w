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
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setFile(selectedFile);
      setPreviewUrl(objectUrl);
    }
  };

  const steps = ["Upload Image", "Verify Image"];
  const id = "verify";
  const currentStep = file ? 1 : 0;

  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("No file selected.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/decodewm", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setVerificationData(data);
      } else {
        alert("File verification failed.");
      }
    } catch (error) {
      console.error("Error verifying file:", error);
      alert("An error occurred while verifying the file.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="container">
        <VerifyStepProgressBar
          steps={steps}
          currentStep={currentStep}
          id={id}
        />
        {file ? (
          <>
            <div className="action-prompt">
              This is the image you're about to verify.
            </div>
            <div className="paragraph-prompt">
              You can reupload a different image by hitting{" "}
              <strong>Remove</strong>.
            </div>
            <div
              style={{
                position: "relative",
                width: "800px",
                height: "500px",
              }}
            >
              <Image
                src={previewUrl}
                alt="Preview"
                sizes="500px"
                fill
                style={{
                  objectFit: "contain",
                }}
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
                Verify
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="action-prompt">Verify an Image (PNG)</div>
            <div className="paragraph-prompt">
              This allows you to verify what address watermarked this image.
              <br />
              You can verify any image that has been watermarked with{" "}
              <strong>W</strong>.
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

        {verificationData && (
          <div>
            <h2>Verification Results:</h2>
            <p>
              <strong>Message:</strong> {verificationData.message}
            </p>
            <p>
              <strong>Signature:</strong> {verificationData.signature}
            </p>
          </div>
        )}
        {loading && <div>Verifying... Please wait.</div>}
      </div>
      <Footer />
    </>
  );
}

export default Page;
