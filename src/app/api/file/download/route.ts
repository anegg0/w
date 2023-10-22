import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest, res: NextResponse) {

  const destinationDirPath = path.join(
    process.cwd(),
    process.env.STORE_ENCODED_IMAGE_PATH!
  );
  const encodedImageFilePath = await path.join(
    process.cwd(),
    "encoded_image.png",
  );
// console.log(`encodedImageFilePath is: ${encodedImageFilePath}`);
  if (fs.existsSync(encodedImageFilePath)) {
    const imageBuffer = fs.readFileSync(encodedImageFilePath);
}
  return new Response(
 res.setHeader("Content-Disposition", "attachment; filename=encoded_image.png"),
 res.setHeader("Content-Type", "application/png"),
 res.send(fileContent),
  );
}

//  const fileContent = fs.readFileSync(filePath);

//  res.setHeader("Content-Disposition", "attachment; filename=example.pdf");
//  res.setHeader("Content-Type", "application/pdf");
//  res.send(fileContent);
// }
