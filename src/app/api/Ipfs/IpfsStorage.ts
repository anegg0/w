import { NFTStorage, File } from "nft.storage";
import fs from "fs";

const API_KEY = process.env.NFT_STORAGE_API_KEY;
if (!API_KEY) {
  throw new Error("NFT_STORAGE_API_KEY environment variable is not set");
}

const client = new NFTStorage({ token: API_KEY });

async function uploadImageAndGetIPFSUri(filePath: string): Promise<string> {
  const data = await fs.promises.readFile(filePath);
  const file = new File([data], filePath, { type: "image/png" }); // You can adjust the type if it's not png
  const uploadedImageUri: string = await client.storeBlob(file);
  return uploadedImageUri;
}

async function uploadMetadataAndGetUri(
  uploadedImageUri: string
): Promise<string> {
  const metadata = {
    name: "Your NFT Name",
    description: "Your NFT Description",
    image: uploadedImageUri,
    // Include other properties as per OpenSea's metadata standards
  };
  const uri = await client.store(metadata);
  return uri;
}

async function main() {
  const imageFilePath = process.env.STORE_ENCODED_IMAGE_PATH!;
  if (!imageFilePath) {
    throw new Error("STORE_ENCODED_IMAGE_PATH environment variable is not set");
  }

  const uploadedImageUri = await uploadImageAndGetIPFSUri(imageFilePath);
  const metadataUri = await uploadMetadataAndGetUri(uploadedImageUri);

  console.log("Your metadata URI for minting:", metadataUri);
  return metadataUri;
}

main().catch(console.error);
