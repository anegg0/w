// Gael Blanchemain: credits appreciated
import { PNG } from "pngjs";
import fs from "fs";
import { promisify } from "util";

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

// embeds the Json into the image using LSB steganography
function embedStringInImage(imageBuffer, jsonString) {
  // Converts string to binary string
  const messageBinary = stringToBinary(jsonString + "\0");
  let messageIndex = 0;

  // Load the PNG image
  const png = PNG.sync.read(imageBuffer);
  const pixels = png.data;

  for (let i = 0; i < pixels.length; i += 4) {
    if (messageIndex < messageBinary.length) {
      // Embeds single bit from the message into the LSB of the red channel
      const bit = Number(messageBinary[messageIndex]);
      // Ensures the LSB of the red channel is set to our message bit
      pixels[i] = (pixels[i] & 0xfe) | bit;
      messageIndex++;
    } else {
      break;
    }
  }

  // Check if the message was too long for the image
  if (messageIndex < messageBinary.length - 1) {
    throw new Error("The message is too long to be embedded in this image.");
  }

  return PNG.sync.write(png);
}

// Helper function to converts string to binary string
function stringToBinary(str) {
  return str
    .split("")
    .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
    .join("");
}

async function encode(inputImagePath, jsonFilePath, outputImagePath) {
  try {
    // Read the JSON file containing the Json
    const jsonString = await readFile(jsonFilePath, "utf8");

    // Reads the input PNG image
    const data = await readFile(inputImagePath);

    // Embeds Json into the image
    const imageWithSecret = embedStringInImage(data, jsonString);

    // Writes output
    await writeFile(outputImagePath, imageWithSecret);
    console.log(`The Json has been embedded into ${outputImagePath}`);
  } catch (err) {
    console.error(err);
  }
}

export { encode };
