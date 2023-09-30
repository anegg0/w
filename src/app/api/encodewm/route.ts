// pages/api/saveJson.js import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
    try {

  if (req.method === "POST") {
      const jsonData = await req.json();

  const signatureFileDirectory = path.join(
    process.cwd(),
    process.env.STORE_SIGNATURE_PATH!
  );

      const signatureFileName = `signature.json`; // Generate a unique filename
      const signatureFilePath = path.join(signatureFileDirectory, signatureFileName);

      if (existsSync(signatureFilePath)) {
          unlinkSync(signatureFilePath);
        }

      if (!existsSync(signatureFileDirectory)) {
        await fs.mkdir(signatureFileDirectory);
      }

      const jsonFile: string = await fs.writeFile(path.join(signatureFileDirectory, signatureFileName), jsonData);
      return NextResponse.json({ msg: "JSON data saved successfully" }, { status: 200 });
  }
    } catch (error) {
      return NextResponse.json({ msg: "Server Error" }, { status: 500 });
      }

  return NextResponse.json({
    url: `/public/uploads/${signatureFileName}`,
  });
}
