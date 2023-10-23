"use client";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";

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
      <div id="verify" className="max-w-xl mx-auto my-4 border-b-2 pb-4">
        <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
          <div className="flex pb-3">
            <div className="flex-1"></div>
            <div className="flex-1">
              <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-gray flex items-center">
                <span className="text-gray text-center w-full">
                  <FaCheck style={{ color: "green" }} />
                </span>
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                  className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded"
                  style={{ width: "100%" }}
                ></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-gray flex items-center">
                <span className="text-gray text-center w-full">
                  <FaCheck />
                </span>
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                  className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded"
                  style={{ width: "20%" }}
                ></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-10 h-10 bg-green border-2 border-grey-light mx-auto rounded-full text-lg text-gray flex items-center">
                <span className="text-grey-darker text-center w-full">3</span>
              </div>
            </div>

            <div className="w-1/6 align-center items-center align-middle content-center flex">
              <div className="w-full bg-grey-light rounded items-center align-middle align-center flex-1">
                <div
                  className="bg-green-light text-xs leading-none py-1 text-center text-grey-darkest rounded"
                  style={{ width: "0%" }}
                ></div>
              </div>
            </div>

            <div className="flex-1">
              <div className="w-10 h-10 bg-green border-2 border-grey-light mx-auto rounded-full text-lg text-gray flex items-center">
                <span className="text-grey-darker text-center w-full">4</span>
              </div>
            </div>

            <div className="flex-1"></div>
          </div>
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

export default ToEncodeFileUploader;
