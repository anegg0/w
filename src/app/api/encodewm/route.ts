import fs from "fs/promises";
import * as crypto from "crypto";
import path from "path";
import { rm } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import axios from "axios";

const asyncExec = promisify(exec);

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

  try {
    const originalImageDirPath = path.join(
      process.cwd(),
      process.env.STORE_IMAGE_PATH!
    );
    const unwatermarkedFilePath = path.join(
      originalImageDirPath,
      "original_image.png"
    );
    const signatureDirectory = path.join(
      process.cwd(),
      process.env.STORE_SIGNATURE_PATH!
    );
    const signatureFilePath = await createFilePath(
      signatureDirectory,
      "signature.json"
    );
    await fs.writeFile(signatureFilePath, signature);

    const EncodedImageFilesDirectory = path.join(
      process.cwd(),
      process.env.STORE_ENCODED_IMAGE_PATH!
    );
    const EncodedImageFilePath = path.join(
      EncodedImageFilesDirectory,
      "encoded_image.png"
    );
    await asyncExec(
      `java -jar openstego.jar embed -a randomlsb -mf ./src/app/signatures/signature.json -cf ./src/app/uploads/original_image.png -sf ./src/app/encoded/encoded_image.png`
    );

    console.log("Background execution completed");
  } catch (error) {
    console.error("Error in background execution:", error);
  }

  return NextResponse.json({
    status: 200,
  });
}
