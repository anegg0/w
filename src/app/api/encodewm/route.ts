// pages/api/saveJson.js
import fs from "fs/promises";
import path from "path";
import { existsSync, unlinkSync, readFile} from "fs";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
const asyncExec = promisify(exec);

export async function POST(req: NextRequest, res: NextResponse) {

 // if (req.method === "POST") {
const jsonData = await req.json();

const signatureFileDirectory = path.join(
  process.cwd(),
  process.env.STORE_SIGNATURE_PATH!
 );

const signatureFileName = `signature.json`; // Generate a unique filename
const signatureFilePath = path.join(signatureFileDirectory, signatureFileName);

   if (existsSync(signatureFileName)) {
await fs.rm(signatureFileName);
    }

const jsonFile: string = await fs.writeFile(path.join(signatureFileDirectory, signatureFileName), jsonData);

const asyncExec = promisify(exec);

const imageFilesDirectory = path.join(
  process.cwd(),
  process.env.STORE_IMAGE_PATH!
 );

const originalImageFileName = `original_image.png`; // Generate a unique filename
const originalImageFilePath = path.join(imageFilesDirectory, originalImageFileName);; // Generate a unique filename
const watermarkedImageFileName = `encoded_image.png`; // Generate a unique filename
const watermarkedImageFilePath = path.join(imageFilesDirectory, watermarkedImageFileName);

   if (existsSync(watermarkedImageFilePath)) {
     unlinkSync(watermarkedImageFilePath);
    }
  try {
 const encoded_imagePath = await asyncExec(
`java -jar openstego.jar --embed --algorithm=randomlsb --messagefile=${ signatureFilePath } --coverfile=${ originalImageFilePath } --stegofile=${ watermarkedImageFilePath }`
    );
    console.log("Embedding successful.");
    return new NextResponse(encoded_imagePath);
  } catch (error)
    {
    console.error("Error during embedding:", error);
    throw error;
    }
    return new NextResponse(encoded_imagePath);
}
