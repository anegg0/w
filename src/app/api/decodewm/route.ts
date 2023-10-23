import { NextRequest, NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest, req: NextResponse) {
  const formData = await req.formData();
  console.log(formData);

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  const newFileName = "image2verify.png";
  const destinationDirPath = path.join(
    process.cwd(),
    process.env.STORE_DECODED_IMAGE_PATH!,
  );
  console.log(`destinationDirPath is: ${destinationDirPath}`);
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
    await fs.mkdir(destinationDirPath);
  }

  let filename = newFileName;
  while (existsSync(path.join(destinationDirPath, filename))) {
    filename = filename;
  }

  await fs.writeFile(
    path.join(destinationDirPath, filename),
    Buffer.from(fileArrayBuffer),
  );

  const [extension, ...name] = filename.split(".").reverse();

  return NextResponse.json({
    fileName: fileName,
  });
}
