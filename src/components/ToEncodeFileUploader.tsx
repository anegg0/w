"use client";
import React, { useState } from "react";
import EncodeStepProgressBar from "@c/EncodeStepProgressBar";

export function ToEncodeFileUploader({ onSuccessfulUpload }) {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
      if (
        selectedFile.type === "image/png" &&
        selectedFile.size >= 1000000 && // At least 1 MB
        (await isImageSizeValid(selectedFile)) // Check image dimensions
      ) {
        const objectUrl = URL.createObjectURL(selectedFile);
        setFile(selectedFile);
        setPreviewUrl(objectUrl);
      } else {
        alert(
          "Please select a PNG image that is at least 1000px x 1000px and at least 1 MB in size.",
        );
      }
    }
  };

  // Function to check image dimensions
  const isImageSizeValid = async (selectedFile) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = URL.createObjectURL(selectedFile);
      img.onload = () => {
        resolve(img.width >= 1000 && img.height >= 1000);
      };
    });
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
      // Send the formData to your server-side API for file handling
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

  const steps = ["Upload Image", "Sign Image", "Define Image", "Mint Image"];
  const currentStep = 0;
  const id = "upload";

  return (
    <div className="container">
      <EncodeStepProgressBar steps={steps} currentStep={currentStep} />
      {file ? (
        <>
          <div className="action-prompt">
            This is your image. Like What You See?
          </div>
          <div className="action-paragraph">
            You can reupload a different image by hitting "Remove".
          </div>
          <div
            style={{ position: "relative", width: "800px", height: "500px" }}
          >
            <img
              src={previewUrl}
              alt="Preview"
              style={{
                objectFit: "contain",
                width: "100%",
                height: "100%",
              }}
            />
          </div>

          <button
            onClick={handleRemove}
            className="block mt-4 px-3 py-2 bg-orange-400 text-white rounded-md"
          >
            Remove
          </button>
          <button
            onClick={handleUpload}
            className="block mt-4 px-3 py-2 bg-orange-400 text-white rounded-md"
          >
            Upload
          </button>
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
          <button
            onClick={handleUpload}
            className="block mt-4 px-3 py-2 bg-orange-400 text-white rounded-md"
          >
            Upload
          </button>
        </>
      )}
    </div>
  );
}

export default ToEncodeFileUploader;
