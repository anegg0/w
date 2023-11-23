import { NextRequest, NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { decode } from "@u/decodeModule.js";

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  const newFileName = "toverify.png";

  const destinationDirPath = path.join(process.cwd(), "src/app/toverify");
  const existingFilePath = path.join(destinationDirPath, newFileName);

  if (existsSync(existingFilePath)) {
    try {
      unlinkSync(existingFilePath);
      console.log(`Deleted existing file: ${existingFilePath}`);
    } catch (error) {
      console.error(`Error deleting existing file: ${existingFilePath}`, error);
    }
  }

  const fileArrayBuffer = await file.arrayBuffer();

  if (!existsSync(destinationDirPath)) {
    await fs.mkdir(destinationDirPath, { recursive: true });
  }

  await fs.writeFile(existingFilePath, Buffer.from(fileArrayBuffer));
  const jsonFilePath = path.join(
    process.cwd(),
    "/src/app/decodedSignature/",
    "signature.json",
  );

  const decodedSignature = decode(existingFilePath, jsonFilePath)
    .then(() => console.log("Decoding process completed."))
    .catch((err) => console.error("An error occurred:", err));

  const jsonData = await fs.readFile(jsonFilePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  const message = parsedData.message;
  const signature = parsedData.signature;

  return NextResponse.json({
    message: message,
    signature: signature,
  });
}
