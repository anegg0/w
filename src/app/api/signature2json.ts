import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from "fs";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === "POST") {
		const { signature2json }: { signature2json: string | null } = req.body;

		if (!signature2json) {
			return res.status(400).json({ error: "Invalid request body" });
		}

		try {
			// Export the JSON string as a 'signature.json' file asynchronously
			const filePath = "./src/public/signature.json";
			const fileContent = signature2json;

			// Write the content to the file asynchronously
			await fs.writeFile(filePath, fileContent);
			// File writing is complete
			// console.log("signature.json written successfully.");

			// Send a success response
			res.status(200).json({ message: "signature.json written successfully" });
		} catch (error) {
			// Handle errors if file writing fails
			console.error("Error writing signature.json:", error);

			// Send an error response
			res.status(500).json({ error: "Failed to write signature.json" });
		}
	} else {
		// Return a method not allowed response for non-POST requests
		res.status(405).json({ error: "Method not allowed" });
	}
}
