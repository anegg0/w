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
  async function calculateFileHash(filePath: string) {
    const fileData = await fs.readFile(filePath);
    const hash = crypto.createHash("sha256");
    hash.update(fileData);
    return hash.digest("hex");
  }
  async function createFilePath(directoryPath, fileName) {
    let filePath: string;
    try {
      filePath = path.join(directoryPath, fileName);
      if (
        await fs
          .access(filePath)
          .then(() => true)
          .catch(() => false)
      ) {
        await fs.rm(filePath);
      }
      filePath = path.join(directoryPath, fileName);
      return filePath;
    } catch (error) {
      console.error("Error while clearing directory:", error);
    }
  }

  try {
    const signatureDirectory = path.join(
      process.cwd(),
      process.env.STORE_SIGNATURE_PATH!
    );

    let signatureFilePath = await createFilePath(
      signatureDirectory,
      "signature.json"
    );

    let signatureFile = await fs.writeFile(signatureFilePath, signature);

    const EncodedImageFilesDirectory = path.join(
      process.cwd(),
      process.env.STORE_ENCODED_IMAGE_PATH!
    );

    const EncodedImageFilePath = await createFilePath(
      EncodedImageFilesDirectory,
      `encoded_image.png`
    );
    const encoded_image = await asyncExec(
      `java -jar openstego.jar --embed --algorithm=randomlsb --messagefile=/home/o/dev/webapp/src/public/signatures/signature.json --coverfile=/home/o/dev/webapp/src/public/uploads/original_image.png --stegofile=/home/o/dev/webapp/src/public/encoded/encoded_image.png`
    );

    const HashesDirectory = path.join(
      process.cwd(),
      process.env.STORE_HASH_PATH!
    );
    const HashFilePath = await createFilePath(HashesDirectory, `hash.json`);

    const hashedData = await calculateFileHash(EncodedImageFilePath);
    let hashFile = await fs.writeFile(HashFilePath, hashedData);
    return new NextResponse(hashedData);
  } catch (error) {
    console.error("Error returned at end of executions:", error);
    throw error;
  }
}
