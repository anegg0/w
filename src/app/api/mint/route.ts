import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NFTStorage, File } from "nft.storage";
import mime from "mime";
export async function POST(req: NextRequest, res: NextResponse) {
	try {
		const { name, description } = await req.json();
		async function fileFromPath(filePath: string) {
			const content = await fs.readFile(filePath);
			const type = mime.getType(filePath);
			return new File([content], path.basename(filePath), { type });
		}
		const imagePath = path.join(
			process.cwd(),
			"src/app/encoded/encoded_image.png",
		);
		const NFT_STORAGE_TOKEN = process.env.NFT_STORAGE_API_KEY;
		async function storeNFT(
			imagePath: string,
			name: string,
			description: string,
			onSuccessfulMetadataCreation: Function, // Add this parameter
		) {
			const image = await fileFromPath(imagePath);
			const nftstorage = new NFTStorage({ token: NFT_STORAGE_TOKEN });
			return nftstorage.store({
				image,
				name,
				description,
			});
		}
		const nftResult = await storeNFT(
			imagePath,
			name,
			description,
			(result: any) => {
				console.log(`Metadata updated successfully! ${result.url}`);
			},
		);
		return NextResponse.json({
			success: true,
			message: "Metadata updated successfully!",
		});
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{
				success: false,
				message: "Internal Server Error",
			},
			{ status: 500 },
		);
	}
}
