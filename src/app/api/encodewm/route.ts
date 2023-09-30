import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";

const asyncExec = promisify(exec);

// Function to calculate SHA-256 hash of a file
async function calculateFileHash(filePath) {
  const fileData = await fs.readFile(filePath);
  const hash = crypto.createHash("sha256");
  hash.update(fileData);
  return hash.digest("hex");
}

export async function POST(req: NextRequest, res: NextResponse) {
  const jsonData = await req.json();

  const signatureFileDirectory = path.join(
    process.cwd(),
    process.env.STORE_SIGNATURE_PATH!
  );

  const signatureFileName = `signature.json`; // Generate a unique filename
  const signatureFilePath = path.join(
    signatureFileDirectory,
    signatureFileName
  );

  if (existsSync(signatureFileName)) {
    await fs.rm(signatureFileName);
  }

  const jsonFile = await fs.writeFile(
    path.join(signatureFileDirectory, signatureFileName),
    jsonData
  );

  const imageFilesDirectory = path.join(
    process.cwd(),
    process.env.STORE_IMAGE_PATH!
  );

  const originalImageFileName = `original_image.png`; // Generate a unique filename
  const originalImageFilePath = path.join(
    imageFilesDirectory,
    originalImageFileName
  );

  const watermarkedImageFileName = `encoded_image.png`; // Generate a unique filename
  const watermarkedImageFilePath = path.join(
    imageFilesDirectory,
    watermarkedImageFileName
  );

  if (existsSync(watermarkedImageFilePath)) {
    unlinkSync(watermarkedImageFilePath);
  }

  try {
    const encoded_imagePath = await asyncExec(
      `java -jar openstego.jar --embed --algorithm=randomlsb --messagefile=${signatureFilePath} --coverfile=${originalImageFilePath} --stegofile=${watermarkedImageFilePath}`
    );
    console.log("Embedding successful.");

    // Calculate the SHA-256 hash of the watermarked image
    const hashedData = await calculateFileHash(watermarkedImageFilePath);
    console.log("Hash of watermarked image:", hashedData);
    return new NextResponse(hashedData);
  } catch (error) {
    console.error("Error during embedding:", error);
    throw error;
  }
}
