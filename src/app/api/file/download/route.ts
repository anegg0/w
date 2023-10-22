import { NextRequest } from "next/server";
import path from "path";
import fs from "fs";

export async function GET(req: NextRequest) {
  const encodedImageFilePath = path.join(
    process.cwd(),
    process.env.STORE_ENCODED_IMAGE_PATH || '',
    "encoded_image.png"
  );

  console.log(`encodedImageFilePath is: ${encodedImageFilePath}`);

  if (fs.existsSync(encodedImageFilePath)) {
    const imageBuffer = fs.readFileSync(encodedImageFilePath);
    const headers = {
      "Content-Disposition": "attachment; filename=encoded_image.png",
      "Content-Type": "image/png"
    };
    return new Response(imageBuffer, { headers });
  } else {
    return new Response("File not found", { status: 404 });
  }
}
