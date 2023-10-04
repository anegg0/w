import fs from "fs/promises";
import path from "path";
import { NFTStorage } from "nft.storage";

if (!process.env.NFT_STORAGE_API_KEY) {
  throw new Error("NFT_STORAGE_API_KEY environment variable is not set");
}
const API_KEY: string = process.env.NFT_STORAGE_API_KEY!;

if (!process.env.STORE_ENCODED_IMAGE_PATH) {
  throw new Error("STORE_ENCODED_IMAGE_PATH environment variable is not set");
}

export async function storeNftOnIpfs() {
  interface Origins {
    ipfs: string;
  }

  interface Author {
    name: string;
  }

  interface Content {
    "text/markdown": string;
  }

  interface NFTData {
    image: Blob;
    name: string;
    description: string;
    properties: {
      type: string;
      origins: Origins;
      authors: Author[];
      content: Content;
    };
  }

  async function createFilePath(
    directoryPath: string,
    fileName: string
  ): Promise<string | undefined> {
    try {
      const filePath = path.join(directoryPath, fileName);

      try {
        await fs.access(filePath);
        await fs.rm(filePath);
      } catch (e) {}

      return filePath;
    } catch (error) {
      console.error("Error while clearing directory:", error);
      return undefined;
    }
  }

  const EncodedImageFilesDirectory: string = path.join(
    process.cwd(),
    process.env.STORE_ENCODED_IMAGE_PATH!
  );

  const EncodedImageFilePath: string = await createFilePath(
    EncodedImageFilesDirectory,
    `encoded_image.png`
  );

  async function getLocalImage(): Promise<Blob> {
    const imageOriginUrl: string = EncodedImageFilePath;
    const r: Response = await fetch(imageOriginUrl);
    if (!r.ok) {
      throw new Error(`error fetching image: [${r.status}]: ${r.statusText}`);
    }
    return r.blob();
  }

  async function storeExampleNFT(): Promise<void> {
    const image: Blob = await getLocalImage();

    // Adjusted the code to fit more likely usage of NFTStorage.store() method.
    const data: NFTData = {
      image: image,
      name: "Example",
      description: "Example NFT",
      properties: {
        type: "image",
        origins: { ipfs: "example_ipfs_uri" },
        authors: [{ name: "Author Name" }],
        content: {
          "text/markdown": "Example Content",
        },
      },
    };

    const client: NFTStorage = new NFTStorage({ token: API_KEY });
    const external_url = await client.store(data);

    console.log("NFT data stored!");
    console.log("Metadata URI: ", external_url.url);
  }

  await storeExampleNFT();
}

storeNftOnIpfs();
