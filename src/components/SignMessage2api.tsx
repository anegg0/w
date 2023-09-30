"use client";
import * as React from "react";
import { useSignMessage } from "wagmi";
import "@a/globals.css";

export function SignMessage2api() {
  const [message, setMessage] = React.useState<string | null>(null);

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
    setMessage(messageValue as string); // Ensure that messageValue is of type string
    signMessage({ message: messageValue });
  };

  const sendSignMessageData = async (requestBody: string) => {
    try {
      // Construct the request body with the signMessageData
		/* const requestBody = {
		 *   signature2json,
		 * };
		 */
      const response = await fetch("/api/encodewm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Request was successful, handle the response as needed
        const result = await response.json();
        console.log("Success:", result);
      } else {
        // Request failed, handle the error
        const errorData = await response.json();
        console.error("Error:", errorData);
      }
    } catch (error) {
      console.error("API request error:", error);
    }
  };

  if (signMessageData) {
  const requestBody = sendSignMessageData(JSON.stringify({
      message: message,
      signature: signMessageData,
    }))
  }

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="w-1/2 p-4">
          <div className="mb-4 text-2xl font-bold rounded-lg">
            {"Sign a message with your wallet"}
          </div>
          <div className="mb-5 text-1xl rounded-lg">
            <p>You can enter any message. For example: WreckageStudio©</p>
          </div>
          <form
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
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
      </div>
    </>
  );
}