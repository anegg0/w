"use client";
import React, { useState } from "react";
import { useSignMessage } from "wagmi";
import "@a/globals.css";
import StepProgressBar from "@c/StepProgressBar";

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

      <StepProgressBar steps={steps} currentStep={currentStep} />
            <div className="action-prompt">
Sign a message with your wallet
    </div>
          <div className="action-paragraph">
    <p>This step will prove that you own this picture.</p>
    <p>You can enter any message</p>
            <p></p>
          </div>
          <form encType="multipart/form-data" onSubmit={handleSubmit}>
            <input
              name="message"
              type="text"
              className="text-gray-500"
              required
              placeholder="WreckageStudio©"
            />
            <button
              disabled={isLoading}
              type="submit"
              className="block mt-4 px-3 py-2 bg-blue-500 text-white rounded-md"
            >
              {isLoading ? "Check Wallet" : "Sign Message"}
            </button>
          </form>
          {error && <div>Error: {error?.message}</div>}
      </div>
  );
}
