import multer from "multer";
import { ExtendRequest } from "../types/ExtendRequest";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../public/images");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req: ExtendRequest, file, cb) {
    const dir = path.join(__dirname, "../public/images");

    // Delete previous file with any supported image extension
    const supportedExtensions = [".png", ".jpg", ".jpeg", ".webp"];
    supportedExtensions.forEach((ext) => {
      const filePath = path.join(dir, `${req.user._id}${ext}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath); // 🔥 Delete old image
      }
    });

    const ext = path.extname(file.originalname); // use current image extension
    cb(null, `${req.user._id}${ext}`);
  },
});

export const upload = multer({ storage: storage }).single("file");
