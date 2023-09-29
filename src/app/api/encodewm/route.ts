// pages/api/saveJson.js import { existsSync, unlinkSync } from "fs";
import fs from "fs/promises";
import path from "path";
import { existsSync, unlinkSync } from "fs";
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === "POST") {
    try {
      const jsonData = await req.json();

  console.log(`jsonData upstream is: ${ jsonData }`);

  const destinationDirPath = path.join(
    process.cwd(),
    process.env.STORE_SIGNATURE_PATH!
  );

      const newFileName = `signature.json`; // Generate a unique filename
      const existingFilePath = path.join(destinationDirPath, newFileName);

      if (existsSync(existingFilePath)) {
          unlinkSync(existingFilePath);
        }

      if (!existsSync(destinationDirPath)) {
        await fs.mkdir(destinationDirPath);
      }

      console.log(`jsonData type downstream is: ${ typeof(jsonData) }`);
      console.log(`newFileName downstream is: ${ newFileName }`);
      const jsonFile: string = await fs.writeFile(path.join(destinationDirPath, newFileName), jsonData);
      return NextResponse.json({ msg: "JSON data saved successfully" }, { status: 200 });
    } catch (error) {
      return NextResponse.json({ msg: "Server Error" }, { status: 500 });
      }
      };

  return NextResponse.json({
    url: `/public/uploads/${newFileName}`,
  });
}
