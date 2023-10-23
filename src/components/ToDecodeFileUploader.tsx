"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

export function ToDecodeFileUploader({ onSuccessfulUpload }) {
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
      <div id="verify" className="max-w-xl mx-auto my-4 border-b-2 pb-4">
        <div className="flex pb-3">
          {/* ... (Other divs and elements for your progress bar) ... */}
        </div>

        <div className="flex text-xs content-center text-center">
          <div className="w-1/4">Upload Picture</div>
          <div className="w-1/4">Add Signature</div>
          <div className="w-1/4">Add Picture Info</div>
          <div className="w-1/4">Publish Picture Onchain</div>
        </div>
      </div>

      <div className="main-container">
        <div className="mb-4 text-2xl font-bold rounded-lg">
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

export default ToDecodeFileUploader;
