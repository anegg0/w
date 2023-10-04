import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { existsSync, unlinkSync, access, rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import axios from "axios";

const asyncExec = promisify(exec);

// async function calculateFileHash(filePath: string) {
//   const fileData = await fs.readFile(filePath);
//   return crypto.createHash("sha256").update(fileData).digest("hex");
// }

async function createFilePath(directoryPath: string, fileName: string) {
  let filePath: string;
  try {
    filePath = path.join(directoryPath, fileName);
    if (
      await access(filePath)
        .then(() => true)
        .catch(() => false)
    ) {
      await rm(filePath);
    }
    filePath = path.join(directoryPath, fileName);
    return filePath;
  } catch (error) {
    console.error("Error while clearing directory:", error);
  }
}

// async function uploadToNftStorage(encodedImagePath: string, apiKey: string) {
//   const fileData = await fs.readFile(encodedImagePath);
//   const response = await axios.post(
//     "https://api.nft.storage/upload",
//     fileData,
//     {
//       headers: {
//         "Content-Type": "application/octet-stream",
//         Authorization: `Bearer ${apiKey}`,
//       },
//     }
//   );
//   return response.data.value.cid;
// }

export async function POST(req: NextRequest, res: NextResponse) {
  const signature = await req.json();

  try {
    const originalImageDirPath = await path.join(
      process.cwd(),
      process.env.STORE_IMAGE_PATH!
    );
    const unwatermarkedFilePath = await path.join(
      originalImageDirPath,
      "original_image.png"
    );
    const signatureDirectory = await path.join(
      process.cwd(),
      process.env.STORE_SIGNATURE_PATH!
    );
    const signatureFilePath = await createFilePath(
      signatureDirectory,
      "signature.json"
    );
    await fs.writeFile(signatureFilePath, signature);

    const EncodedImageFilesDirectory = await path.join(
      process.cwd(),
      process.env.STORE_ENCODED_IMAGE_PATH!
    );
    const EncodedImageFilePath = await path.join(
      EncodedImageFilesDirectory,
      "encoded_image.png"
    );
    const encoded_image = await asyncExec(
      `java -jar openstego.jar embed -a randomlsb -mf ./src/app/signatures/signature.json -cf ./src/app/uploads/original_image.png -sf ./src/app/encoded/encoded_image.png`
    );
    // const HashesDirectory = await path.join(
    //   process.cwd(),
    //   process.env.STORE_HASH_PATH!
    // );
    // const HashFilePath = await createFilePath(HashesDirectory, "hash.json");
    // const hashedData = await calculateFileHash(EncodedImageFilePath);
    // await fs.writeFile(HashFilePath, hashedData);

    // const apiKey = await process.env.NFT_STORAGE_API_KEY;
    // const cid = await uploadToNftStorage(EncodedImageFilePath, apiKey);

    // console.log(`cid is: ${cid}`);
    // const metadataFileDirectory = await path.join(
    //   process.cwd(),
    //   process.env.STORE_METADATA_FILE!
    // );

    // const metadataFilePath = await createFilePath(
    //   metadataFileDirectory,
    //   `metadata.json`
    // );
    // const metadata = {
    //   description: "",
    //   external_url: `ipfs://${cid}`,
    //   name: "",
    // };
    // const metadataFileContent = await JSON.stringify(metadata, null, 2);
    // console.log(`metadata.json is: ${metadataFileContent}`);

    // await fs.writeFile(metadataFilePath, metadataFileContent);

    console.log("Background execution completed");
  } catch (error) {
    console.error("Error in background execution:", error);
  }

  return NextResponse.json({
    status: 200,
  });
}
