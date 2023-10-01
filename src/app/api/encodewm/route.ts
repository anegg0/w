import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const asyncExec = promisify(exec);

export async function POST(req: NextRequest, res: NextResponse) {

const signature = await req.json();
async function calculateFileHash(filePath) {
const fileData = await fs.readFile(filePath);
const hash = crypto.createHash("sha256");
hash.update(fileData);
return hash.digest("hex");
}
async function createFilePath(directoryPath, fileName ) {
let filePath;
try {
  filePath = path.join(directoryPath, fileName);
  if (await fs.access(filePath).then(() => true).catch(() => false)) {
    await fs.rm(filePath);
  }
  filePath = path.join(directoryPath, fileName);
  return filePath;

} catch (error) {
  console.error('Error while clearing directory:', error);
}
}

const signatureDirectory = path.join(process.cwd(), process.env.STORE_SIGNATURE_PATH!);
let  signatureFilePath = await createFilePath(signatureDirectory, 'signature.json');
let signatureFile = await fs.writeFile(signatureFilePath, signature);

const imageFilesDirectory = path.join(process.cwd(), process.env.STORE_IMAGE_PATH!);
const originalImage = path.join(imageFilesDirectory, 'original_image.png');

const EncodedImageFilesDirectory = path.join(process.cwd(), process.env.STORE_ENCODED_IMAGE_PATH!);
const EncodedImageFilePath = await createFilePath( EncodedImageFilesDirectory, `encoded_image.png` );
try {

    // const encoded_image = await asyncExec(
      // `java -jar openstego.jar --embed --algorithm=randomlsb --messagefile=${signatureFile} --coverfile=${originalImage} --stegofile=${EncodedImageFilePath}`);

  const encoded_image = await asyncExec(`java -jar openstego.jar --embed --algorithm=randomlsb --messagefile=/home/o/dev/webapp/src/public/signatures/signature.json --coverfile=/home/o/dev/webapp/src/public/uploads/original_image.png --stegofile=/home/o/dev/webapp/src/public/encoded/encoded_image.png`);
    console.log("Encoded image:", encoded_image);
} catch (err) {
    console.error(err);
  // Do something
}
//     // Calculate the SHA-256 hash of the watermarked image
//     const hashedData = await calculateFileHash(watermarkedImageFilePath);
//     console.log("Hash of watermarked image:", hashedData);
//     return new NextResponse(hashedData);
//   } catch (error) {
//     console.error("Error during embedding:", error);
//     throw error;
//   }
}
