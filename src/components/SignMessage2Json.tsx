"use client";
// SignMessage2Json.tsx
import React from "react";
import { useEffect, useState } from "react";
import { recoverMessageAddress } from "viem";
import { type Address, useSignMessage } from "wagmi";

interface SignMessage2JsonProps {
	message: string | null;
	recoveredAddress: string | null;
	signMessageData: string | null;
	onCreateJsonData: () => void;
}

export const SignMessage2Json: React.FC<SignMessage2JsonProps> = ({
	message,
	recoveredAddress,
	signMessageData,
	onCreateJsonData,
}) => {
	const handleCreateJsonData = () => {
		// Create JSON data here
		const jsonData = {
			message,
			recoveredAddress,
			signMessageData,
		};

		// Log the JSON string to the console
		console.log("JSON Data:", JSON.stringify(jsonData));

		// Call the provided callback
		onCreateJsonData();
	};

	return (
		<div>
			<h2>SignMessage2Json Component</h2>
			<button onClick={handleCreateJsonData}>Create JSON Data</button>
			{message && <p>Message: {message}</p>}
			{recoveredAddress && <p>Recovered Address: {recoveredAddress}</p>}
			{signMessageData && <p>Sign Message Data: {signMessageData}</p>}
		</div>
	);
};
