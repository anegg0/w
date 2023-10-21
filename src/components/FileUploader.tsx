"use client";
import React, { useState } from "react";
import { IconName } from "react-icons/fa";
import "@a/globals.css";
import { page } from "@a/page";
import { Square } from "@c/Square";

export function FileUploader({ onSuccessfulUpload }) {
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

  const handleCancel = () => {
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
      const response = await fetch("/api/file", {
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
      <div className="max-w-xl mx-auto my-4 border-b-2 pb-4">
        <div className="flex pb-3">
          <div className="flex-1"></div>

          <div className="flex-1">
            <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
              <span className="text-white text-center w-full">
                <i className="fa fa-check w-full fill-current white">1</i>
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
            <div className="w-10 h-10 bg-green mx-auto rounded-full text-lg text-white flex items-center">
              <span className="text-white text-center w-full">
                <i className="fa fa-check w-full fill-current white">2</i>
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
            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
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
            <div className="w-10 h-10 bg-white border-2 border-grey-light mx-auto rounded-full text-lg text-white flex items-center">
              <span className="text-grey-darker text-center w-full">4</span>
            </div>
          </div>

          <div className="flex-1"></div>
        </div>

        <div className="flex text-xs content-center text-center">
          <div className="w-1/4">Invitation received</div>
          <div className="w-1/4">Personal details</div>
          <div className="w-1/4">Application details</div>
          <div className="w-1/4">Confirmation</div>
        </div>
      </div>

      <div className="main-container">
        <div className="mb-4 text-2xl font-bold rounded-lg">
          {file ? "File Preview" : "Get started by uploading your file (PNG)"}
        </div>
        {file ? (
          <div>
            <img src={previewUrl} alt="Preview" className="max-w-full h-auto" />
            <button
              onClick={handleCancel}
              className="block mt-4 px-3 py-2 bg-red-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              className="block mt-4 px-3 py-2 bg-blue-800 text-white rounded-md"
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
              className="block mt-4 px-3 py-2 bg-blue-800 text-white rounded-md"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default FileUploader;
