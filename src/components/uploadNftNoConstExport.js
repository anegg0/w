import fs from "fs";
import mime from "mime";
import path from "path";
import { NFTStorage, File } from "nft.storage";
import config from "./nftUploadConfig.json" assert { type: "json" };

// config: Data = require("./nftUploadConfig.json");

async function fileFromPath(filePath) {
  const content = await fs.promises.readFile(filePath);
  const type = mime.getType(filePath);
  return new File([content], path.basename(filePath), { type });
}

function getAllImages() {
  const supportImageTypes = ["jpg", "jpeg", "png"];
  let images = [];

  fs.readdirSync(config.imagesDirectory).forEach((file) => {
    if (supportImageTypes.includes(file.split(".").pop())) {
      images.push(path.join(config.imagesDirectory, file));
    }
  });
  return images;
}

function getAllMetadata() {
  let metadata = [];
  fs.readdirSync(config.metadataDirectory).forEach((file) => {
    metadata.push(path.join(config.metadataDirectory, file));
  });
  return metadata;
}

async function uploadNft() {
  const allImages = getAllImages();
  const allMetadata = getAllMetadata();

  if (allImages.length !== allMetadata.length) {
    return Promise.reject(
      new Error("Error: Number of images and metadata files do not match")
    );
  }

  let allRequests = [];
  for (let i = 0; i < allImages.length; i++) {
    const imageBlob = await fileFromPath(allImages[i]);
    allRequests.push(imageBlob);

    const metadataBlob = await fileFromPath(allMetadata[i]);
    allRequests.push(metadataBlob);
  }

  const client = new NFTStorage({ token: config.nftStorageKey });

  const cid = await client.storeDirectory(allRequests);
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
