import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

export default {
  tmpFolder: resolve(__dirname, "..", "..", "tmp"),
  storage: multer.diskStorage({
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(16).toString("hex");
      const filename = `${fileHash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
};
