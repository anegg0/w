import React, { useState } from "react";
import Image from "next/image";
import Upload from "./Upload"; // Replace with your Upload component
// import SignatureButton from '../components/SignatureButton'; // Replace with your SignatureButton component
// import MetadataForm from '../components/MetadataForm'; // Replace with your MetadataForm component
// import MintButton from '../components/MintButton'; // Replace with your MintButton component

export function Sequence() {
  const [step, setStep] = useState(1);
  const [uploadStatus, setUploadStatus] = useState("");
  const [signatureStatus, setSignatureStatus] = useState("");
  const [metadataStatus, setMetadataStatus] = useState("");
  const [mintStatus, setMintStatus] = useState("");
  const [fileUrl, setFileUrl] = useState("");

  const handleUploadSuccess = (fileUrl) => {
    setFileUrl(fileUrl);
    setStep(3);
  };

  const handleUploadFailure = () => {
    setUploadStatus("KO");
    setStep(2);
  };

  const handleSignatureSuccess = () => {
    setSignatureStatus("OK");
    setStep(4);
  };

  const handleSignatureFailure = () => {
    setSignatureStatus("KO");
    setStep(2);
  };

  const handleMetadataSuccess = () => {
    setMetadataStatus("OK");
    setStep(5);
  };

  const handleMetadataFailure = () => {
    setMetadataStatus("KO");
    setStep(2);
  };

  const handleMintSuccess = () => {
    setMintStatus("OK");
    setStep(6);
  };

  const handleMintFailure = () => {
    setMintStatus("KO");
    setStep(2);
  };

  const resetStatus = () => {
    setUploadStatus("");
    setSignatureStatus("");
    setMetadataStatus("");
    setMintStatus("");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-1/2 p-4 ">
        <div className="mb-4 text-2xl font-bold rounded-lg">
          {step === 1 && "Get started by uploading your file (PNG)"}
          {uploadStatus === "KO" && "Upload failed. Can you try again?"}
          {step === 2 &&
            "Something went wrong. Sorry! Could you do that again?"}
          {signatureStatus === "OK" &&
            "Your file has been Watermarked with your signature. You can now add a form describing your NFT (metadata)"}
          {metadataStatus === "OK" && "Mint your file as an NFT"}
          {mintStatus === "OK" && "Your NFT has been minted"}
        </div>
        {step === 1 && (
          <Upload
            onSuccess={handleUploadSuccess}
            onFailure={handleUploadFailure}
          />
        )}
        {step === 2 && (
          <div>
            <Upload
              onSuccess={handleUploadSuccess}
              onFailure={handleUploadFailure}
            />
            <button
              onClick={resetStatus}
              className="mt-4 px-4 py-2 bg-red-500 text-white"
            >
              Retry
            </button>
          </div>
        )}
        {step === 3 && (
          <SignatureButton
            onSuccess={handleSignatureSuccess}
            onFailure={handleSignatureFailure}
          />
        )}
        {step === 4 && (
          <MetadataForm
            onSuccess={handleMetadataSuccess}
            onFailure={handleMetadataFailure}
          />
        )}
        {step === 5 && (
          <MintButton
            onSuccess={handleMintSuccess}
            onFailure={handleMintFailure}
          />
        )}
      </div>
      {fileUrl && step >= 3 && (
        <div className="w-1/2 p-4">
          <img
            src={fileUrl}
            alt="Uploaded file"
            className="max-w-full max-h-80 mx-auto"
          />
        </div>
      )}
    </div>
  );
}
