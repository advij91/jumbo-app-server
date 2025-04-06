import dotenv from "dotenv";
import fs from "fs";
import multer from "multer";
import { S3 } from "@aws-sdk/client-s3";

dotenv.config();

// Configure S3 client for Cloudflare R2
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECERT_KEY,
    signatureVersion: "v4",
  },
  endpoint: process.env.CLOUDFLARE_API_END_POINT,
  region: "auto",
});

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "uploads/";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

export const upload = multer({ storage: storage });

// Function to upload a file to Cloudflare R2
export const uploadToR2 = async (filePath, fileName) => {
  const fileStats = fs.statSync(filePath);

  if (fileStats.size > 10485760) {
    throw new Error("File size exceeds 10MB limit");
  }

  const file = fs.readFileSync(filePath);
  const params = {
    Bucket: process.env.S3_BUCKET_NAME, // Bucket name
    Key: fileName, // File name in the bucket
    Body: file, // File content
  };

  try {
    const data = await s3.putObject(params); // Await the upload
    // console.log("File uploaded successfully to R2:", data);

    // Construct the public URL for the uploaded file
    const imageUrl = `${process.env.CLOUDFLARE_API_END_POINT}/${process.env.S3_BUCKET_NAME}/${fileName}`;
    return imageUrl;
  } catch (err) {
    console.error("Error uploading file to R2:", err);
    throw err;
  }
};
