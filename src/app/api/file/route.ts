import { NextRequest, NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  console.log(formData);

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;

  // Change the incoming file's name to "wowm.png"
  const newFileName = "wowm.png";

  // Get the destination directory path
  const destinationDirPath = path.join(
    process.cwd(),
    process.env.STORE_IMAGE_PATH!
  );
  console.log(`destinationDirPath is: ${destinationDirPath}`);
  // Check if "wowm.png" already exists and delete it if so
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
    Buffer.from(fileArrayBuffer)
  );

  const [extension, ...name] = filename.split(".").reverse();

  return NextResponse.json({
    url: `/public/uploads/${newFileName}`,
  });
}
