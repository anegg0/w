import React, { useState } from "react";
import { page } from "../page";
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
        /* alert("File uploaded successfully."); */
        onSuccessfulUpload(2);
      } else {
        // Handle an error response here
        alert("File upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("An error occurred while uploading the file.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4">
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
    </div>
  );
}

export default FileUploader;