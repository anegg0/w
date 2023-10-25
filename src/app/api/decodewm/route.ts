import { NextRequest, NextResponse } from "next/server";
import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const asyncExec = promisify(exec);

export async function POST(req: NextRequest, res: NextResponse) {
  const formData = await req.formData();

  const f = formData.get("file");

  if (!f) {
    return NextResponse.json({}, { status: 400 });
  }

  const file = f as File;
  const newFileName = "toverify.png";

  const destinationDirPath = path.join(process.cwd(), "src/app/encoded");
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
    process.env.STORE_VERIFIED_SIGNATURE_PATH!,
    "signature.json",
  );
  // Check if signature.json exists, if not create it with the given content
  if (!existsSync(jsonFilePath)) {
    const defaultData = {
      message: "test",
      signature: "test",
    };
    await fs.writeFile(jsonFilePath, JSON.stringify(defaultData, null, 2));
  }
  // Execute the openstego.jar command
  await asyncExec(
    `java -jar openstego.jar extract --algorithm=randomlsb --stegofile=../../toverify/toverify.png --extractdir=../../decodedSignature`,
  );

  // Parse the JSON file generated
  // const jsonFilePath = path.join(
  //   process.cwd(),
  //   "../../decodedSignature",
  //   "signature.json",
  // );

  const jsonData = await fs.readFile(jsonFilePath, "utf-8");
  const parsedData = JSON.parse(jsonData);

  const message = parsedData.message;
  const signature = parsedData.signature;

  return NextResponse.json({
    message: message,
    signature: signature,
  });
}
