import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

console.log("Cloudinary key from env:", process.env.CLOUDINARY_API_KEY);

// console.log("lala")
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "hts",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => file.originalname.split(".")[0] + "_" + Date.now(),
  },
});

export const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });
