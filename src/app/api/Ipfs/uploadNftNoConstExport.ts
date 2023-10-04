import fs from "fs";
import mime from "mime";
import path from "path";
import { NFTStorage, File } from "nft.storage";
import config from "./nftUploadConfig.json" assert { type: "json" };

interface Config {
  imagesDirectory: string;
  metadataDirectory: string;
  nftStorageKey: string;
}

const typedConfig = config as Config;

export async function fileFromPath(filePath: string): Promise<File> {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  if (!type) {
    throw new Error(`Unable to determine mime type for file: ${filePath}`);
  }
  return new File([content], path.basename(filePath), { type });
}

function getAllImages(): string[] {
  const supportImageTypes: string[] = ["jpg", "jpeg", "png"];
  let images: string[] = [];

  fs.readdirSync(typedConfig.imagesDirectory).forEach((file) => {
    if (supportImageTypes.includes(file.split(".").pop() as string)) {
      images.push(path.join(typedConfig.imagesDirectory, file));
    }
  });
  return images;
}

function getAllMetadata(): string[] {
  let metadata: string[] = [];
  fs.readdirSync(typedConfig.metadataDirectory).forEach((file) => {
    metadata.push(path.join(typedConfig.metadataDirectory, file));
  });
  return metadata;
}

async function uploadNft(): Promise<string> {
  const allImages = getAllImages();
  const allMetadata = getAllMetadata();

  if (allImages.length !== allMetadata.length) {
    return Promise.reject(
      new Error("Error: Number of images and metadata files do not match")
    );
  }

  let allRequests: File[] = [];
  for (let i = 0; i < allImages.length; i++) {
    const imageBlob = await fileFromPath(allImages[i]);
    allRequests.push(imageBlob);

    const metadataBlob = await fileFromPath(allMetadata[i]);
    allRequests.push(metadataBlob);
  }

  const client = new NFTStorage({ token: typedConfig.nftStorageKey });

  const cid: string = await client.storeDirectory(allRequests);
  console.log(cid);

  return new Promise((resolve, reject) => {
    fs.writeFile("cid.txt", cid, (err) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log("cid saved to cid.txt");
        resolve(cid);
      }
    });
  });
}

uploadNft();

export default uploadNft;
