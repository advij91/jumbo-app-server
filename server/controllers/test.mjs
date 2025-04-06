import { uploadToR2 } from "../middleware/uploadService.mjs"

(async () => {
  try {
    const filePath = "uploads/1743192135354-goal.png"; // Replace with a valid file path
    const fileName = "1743192135354-goal.png"; // Replace with the desired file name in the bucket

    const result = await uploadToR2(filePath, fileName);
    console.log("Upload result:", result);
  } catch (error) {
    console.error("Test upload failed:", error);
  }
})();