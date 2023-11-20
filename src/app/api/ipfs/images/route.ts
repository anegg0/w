import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { NFTStorage, File } from "nft.storage";
import mime from "mime";

export async function POST(req: NextRequest, res: NextResponse) {
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
	) {
		const image = await fileFromPath(imagePath);
		const nftstorage = new NFTStorage({ token: NFT_STORAGE_TOKEN });
		return nftstorage.store({
			image,
			name,
			description,
		});
	}
	const nftResult = await storeNFT(imagePath, name, description);

	return NextResponse.json({
		url: nftResult.url,
	});
}
