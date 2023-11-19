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
import { ethers } from "ethers";
import { hashMessage } from "@ethersproject/hash";
import { useNetwork } from "wagmi";
import { NextPage } from "next";

const Page: NextPage = ({ onSuccessfulUpload }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [verificationData, setVerificationData] = useState(null);
  const [recoveredAddress, setRecoveredAddress] = useState(null);
  const { chain, chains } = useNetwork();

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
    setRecoveredAddress(null); // Clear the recovered address when removing the file
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
        const message = data.message;
        const signature = data.signature;
        const hash = await hashMessage(message);
        const recoveredAddress = await ethers.recoverAddress(hash, signature);
        setRecoveredAddress(recoveredAddress);
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
      {typeof recoveredAddress === "string" && recoveredAddress ? (
        <>
          <Header />
          <div className="container">
            <VerifyStepProgressBar steps={steps} currentStep={2} id={id} />
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="action-prompt text-center">
                The image has been verified.
              </div>
              <div className="paragraph-prompt">
                The address which signed this image is{" "}
                <strong>{recoveredAddress}</strong>
                <br />
              </div>
              <a
                href={`https://${chain.name}.etherscan.io/address/${recoveredAddress}`}
                className="text-blue-300 font-normal text-center"
              >
                Follow a link to this account on the {chain.name} chain
              </a>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        // Render this block if the address is not recovered
        <>
          <Header />
          <div className="container">
            <VerifyStepProgressBar steps={steps} currentStep={1} id={id} />
            {file ? (
              <>
                <div className="action-prompt">
                  This is the image you're about to verify.
                </div>
                <div className="action-paragraph">
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
              </>
            ) : (
              <>
                <div className="action-prompt">Verify an Image (PNG)</div>
                <div className="action-paragraph">
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
                <button
                  onClick={handleUpload}
                  className="btn bg-orange-400 text-gray rounded-sm p-1"
                >
                  Upload
                </button>
              </>
            )}
          </div>
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
