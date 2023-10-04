import { NFTStorage, File } from "nft.storage";
import fs from "fs";
import mime from "mime";
import path from "path";
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
  let encoded_image = images[0];
  console.log(encoded_image);
  return images;
}

async function uploadNft(): Promise<string> {
  const allImages = getAllImages();
  // const allMetadata = getAllMetadata();

  // if (allImages.length !== allMetadata.length) {
  // return Promise.reject(
  // new Error("Error: Number of images and metadata files do not match")
  //   );
  // }

  let allRequests: File[] = [];
  for (let i = 0; i < allImages.length; i++) {
    const imageBlob = await fileFromPath(allImages[i]);
    allRequests.push(imageBlob);
    console.log(allRequests[0]);
  }

  // const cid: string = await client.storeDirectory(allRequests);
  // console.log(cid);
  const client = new NFTStorage({ token: typedConfig.nftStorageKey });

  const cid: string = await client.storeDirectory(allRequests);
  console.log(cid);

  async function storeExampleNFT() {
    const image = await getExampleImage();
    const nft = {
      , // use image Blob as `image` field
      name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
      description: "The metaverse is here. Where is it all being stored?",
    };

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

// const imageFilePath = typedConfig.imagesDirectory;

// console.log(`imageFilePath is: ${imageFilePath}`);

// async function getExampleImage() {
//   const imageOriginUrl = imageFilePath;
//   const r = await fetch(imageOriginUrl);
//   return r.blob();
// }

// async function storeExampleNFT() {
//   const image = await getExampleImage();
//   const nft = {
//     image, // use image Blob as `image` field
//     name: "Storing the World's Most Valuable Virtual Assets with NFT.Storage",
//     description: "The metaverse is here. Where is it all being stored?",
//   };

//   const client = new NFTStorage({ token: typedConfig.nftStorageKey });

//   const metadata = await client.store(nft);

//   console.log("NFT data stored!");
//   console.log("Metadata URI: ", metadata.url);
// }

// storeExampleNFT();
