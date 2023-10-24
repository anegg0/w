"use client";
import React, { useState } from "react";
import { useSignMessage } from "wagmi";
import "@a/globals.css";
import EncodeStepProgressBar from "@c/EncodeStepProgressBar";

export function SignMessage2api({ onSuccessfulEncoding }) {
  let [message, setMessage] = React.useState<string | null>(null);
  let [loadingInProgress, setLoading] = useState(true);
  const steps = ["Upload Image", "Sign Image", "Define Image", "Mint Image"];
  const currentStep = 1;
  const id = "upload";

  const {
    data: signMessageData,
    error,
    isLoading,
    signMessage,
    variables,
  } = useSignMessage();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const messageValue = formData.get("message");
    setMessage(messageValue as string);
    signMessage({ message: messageValue });
  };

  const sendSignMessageData = async (requestBody: string) => {
    try {
      const response = await fetch("/api/encodewm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (response.ok) {
        onSuccessfulEncoding(3);
      } else {
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  if (signMessageData) {
    const requestBody = sendSignMessageData(
      JSON.stringify({
        message: message,
        signature: signMessageData,
      })
    );
  }

  return (
      <div className="container">

      <EncodeStepProgressBar steps={steps} currentStep={currentStep} />
            <div className="action-prompt">
Sign a message with your wallet
    </div>
          <div className="action-paragraph">
    <p>This step will embed your crypto-signature in this image,</p>
    <p>your wallet will request you to sign this message,</p>
    <p>You can enter any message to sign.</p>
          </div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <div className="action-buttons">
            <input
              name="message"
              type="text"
              className="text-gray-500"
              required
              placeholder="WreckageStudio©"
            />
          </div>
          <div className="action-buttons">
            <button
              disabled={isLoading}
              type="submit"
              className="block mt-4 px-3 py-2 bg-orange-400 text-white rounded-md"
            >
              {isLoading ? "Check Wallet" : "Sign Message"}
            </button>
          </div>
          </form>
          {error && <div>Error: {error?.message}</div>}
      </div>
  );
}
