import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { encode } from "@s/utils/encodeModule.js";
async function createFilePath(directoryPath: string, fileName: string) {
  const filePath = path.join(directoryPath, fileName);
  try {
    if (await fs.access(filePath)) await rm(filePath);
  } catch (error) {
    console.error("Error while clearing directory:", error);
  }
  return filePath;
}

export async function POST(req: NextRequest, res: NextResponse) {
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
