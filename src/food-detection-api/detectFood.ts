// import { Request, Response } from "express";
// import vision from "@google-cloud/vision";
// import { config } from "dotenv";
// config();

// const client = new vision.ImageAnnotatorClient();
// const DetectFood = async (req: Request, res: Response) => {
//   const { file } = req.body;
//   const name = await detectFood(file);
//   console.log(name);
// };

// async function detectFood(imagePath: string) {
//   try {
//     // Convert base64 image to a buffer and save it to a temporary file
//     const base64Data = imagePath.split(",")[1]; // Extract base64 data
//     const buffer = Buffer.from(base64Data, "base64");
//     const tempFilePath = "/tmp/tempImage.jpg"; // Define a temporary file path

//     // Write the buffer to a temporary file
//     require("fs").writeFileSync(tempFilePath, buffer);

//     const [result] = await client.labelDetection(tempFilePath);
//     const labels = result.labelAnnotations;

//     if (!labels || labels.length === 0) {
//       console.log("No food items detected.");
//       return [];
//     }

//     // Filter only food-related labels
//     const foodItems = labels
//       .filter((label) => label.description && label.score && label.score > 0.7) // Adjust confidence threshold if needed
//       .map((label) => ({
//         name: label.description,
//         confidence: label.score,
//       }));

//     return foodItems;
//   } catch (error) {
//     console.error("❌ Error detecting food:", error);
//     return [];
//   }
// }

// export default DetectFood;
