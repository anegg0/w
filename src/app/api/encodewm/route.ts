import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { encode } from "@s/utils/encodeModule.js";

async function createFilePath(directoryPath: string, fileName: string) {
  const filePath = path.join(directoryPath, fileName);
  try {
    // Check if the file exists
    await fs.access(filePath);

    // If the file exists, remove it
    await rm(filePath);
  } catch (error: unknown) {
    // Note the type annotation here
    // Ensure that the error is an instance of Error
    if (error instanceof Error) {
      // Now you can safely check the error code
      if (error.code !== "ENOENT") {
        console.error("Error while clearing directory:", error);
      }
    } else {
      // Handle the case where the error is not an Error instance
      console.error("An unknown error occurred");
    }
  }
  return filePath;

  async function POST(req: NextRequest, res: NextResponse) {
    const signature = await req.json();

    // try {
    const originalImageDirPath = path.join(process.cwd(), "/src/app/uploads/");
    const unwatermarkedFilePath = path.join(
      originalImageDirPath,
      "original_image.png",
    );
    const signatureDirectory = path.join(process.cwd(), "/src/app/signatures/");
    const signatureFilePath = await createFilePath(
      signatureDirectory,
      "signature.json",
    );
    await fs.writeFile(signatureFilePath, signature);

    const EncodedImageFilesDirectory = path.join(
      process.cwd(),
      "/src/app/encoded/",
    );
    const EncodedImageFilePath = path.join(
      EncodedImageFilesDirectory,
      "encoded_image.png",
    );

    const embeddedImage = encode(
      unwatermarkedFilePath,
      signatureFilePath,
      EncodedImageFilePath,
    )
      .then(() => console.log("Embedding process completed."))
      .catch((err) => console.error("An error occurred:", err));

    return NextResponse.json({
      status: 200,
    });
  }
}
