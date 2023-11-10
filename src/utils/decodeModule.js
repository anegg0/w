// Gael Blanchemain: credits appreciated
import { PNG } from "pngjs";
import fs from "fs/promises";

// Extract string from image
function extractStringFromImage(imageBuffer) {
  const png = PNG.sync.read(imageBuffer);
  const pixels = png.data;

  let binaryString = "";
  let message = "";

  for (let i = 0; i < pixels.length; i += 4) {
    const bit = pixels[i] & 0x1;
    binaryString += bit.toString();

    if (binaryString.length === 8) {
      const charCode = parseInt(binaryString, 2);
      binaryString = "";

      if (charCode === 0) {
        break;
      }

      message += String.fromCharCode(charCode);
    }
  }

  return message;
}

// Main function to handle the extraction process
async function decode(inputImagePath, outputJsonPath) {
  try {
    const data = await fs.readFile(inputImagePath);
    const secretMessageJson = extractStringFromImage(data);

    try {
      const secretMessageObj = JSON.parse(secretMessageJson);
      const messageJson = JSON.stringify(secretMessageObj, null, 2);
      await fs.writeFile(outputJsonPath, messageJson);
      console.log(
        `The secret JSON message has been extracted to ${outputJsonPath}`,
      );
    } catch (e) {
      console.error("The extracted message is not valid JSON:", e);
    }
  } catch (err) {
    console.error(err);
  }
}

// Export the main function
export { decode };
