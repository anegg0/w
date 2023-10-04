// pages/api/mint.ts

import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest, res: NextResponse) {
  // if (req.method !== "POST") {
  //   return res.status(405).end(); // Method Not Allowed
  // }

  const { name, description } = await req.json();
  // Get path to the metadata.json file
  const metadataFileDirectory = path.join(
    process.cwd(),
    process.env.STORE_METADATA_FILE!
  );
  const metadataFilePath = path.join(metadataFileDirectory, `metadata.json`);

  try {
    // Read current metadata
    const currentMetadataRaw = await fs.readFile(metadataFilePath, "utf-8");
    const currentMetadata = JSON.parse(currentMetadataRaw);

    console.log(name, description);
    // Update the metadata with the new name and description
    currentMetadata.name = name;
    currentMetadata.description = description;

    // Write the updated metadata back to the file
    await fs.writeFile(
      metadataFilePath,
      JSON.stringify(currentMetadata, null, 2)
    );
    console.log(`Metadata updated successfully!${currentMetadata.description}`);
    return NextResponse.json(
      {
        success: true,
        message: "Metadata updated successfully!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }

  return NextResponse({
    message: currentMetadata.name,
  });
}
