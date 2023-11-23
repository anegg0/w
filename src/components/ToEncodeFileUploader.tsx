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
    <div className="flex items-center px-5 py-12 lg:px-20">
      <div className="flex-col w-full max-w-3xl p-10 mx-auto my-6 transition duration-500 ease-in-out transform bg-gray-700 rounded-lg md:mt-0">
        <EncodeStepProgressBar steps={steps} currentStep={currentStep} />
        <div className="max-w-xl mx-auto my-2 border-b-2 border-gray-200 pb-2 w-full flex-col items-center">
          {file ? (
            <>
              <div className="text-lg font-normal text-center m-4 mb-2">
                This is your image. Like What You See?
              </div>
              <div className="items-center text-base text-center max-w-3/4 m-4 mb-2 leading-loose">
                You can reupload a different image by hitting "Remove".
              </div>
              <div className="max-w-xl mx-auto my-2 border-b-2 pb-2 w-full flex-col items-center">
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{
                    objectFit: "contain",
                    width: "70%",
                    height: "70%",
                  }}
                />
              </div>

              <button
                onClick={handleRemove}
                className="m-3 p-2 bg-orange-400 text-white rounded place-content-center"
              >
                Remove
              </button>
              <button
                onClick={handleUpload}
                className="m-3 p-2  py-3 bg-orange-400 text-white rounded place-content-center"
              >
                Upload
              </button>
            </>
          ) : (
            <>
              <div className="max-w-xl mx-auto my-2 border-b-2 pb-2 w-full flex-col items-center">
                <div className="items-center text-base text-center max-w-3/4 m-4 mb-2 leading-loose">
                  Get started by uploading your file (PNG)
                </div>
                <div className="input-wrapper">
                  <input
                    type="file"
                    name="file"
                    required
                    onChange={handleFileChange}
                    accept=".png"
                    className="m-4"
                  />
                </div>
                <button
                  onClick={handleUpload}
                  className="flex m-3 p-2  bg-orange-400 text-white rounded  place-content-center"
                >
                  Upload
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ToEncodeFileUploader;
