import multer from "multer";
import fs from "fs-extra";
import Path from "path";

// Ensure cross-platform file path handling
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use path.join to ensure cross-platform paths
    let path = Path.join("uploads", "categories");

    // Ensure directory exists
    if (!fs.existsSync(path)) {
      console.log("Folder is created");
      fs.mkdirsSync(path);  // fs-extra creates all necessary directories
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    // Use the current timestamp as the file name
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExt = [".png", ".jpg", ".jpeg", ".svg"];

  // Validate file extension
  if (!acceptableExt.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg, .jpeg, .svg formats are allowed"));
  }

  // Validate file size (5 MB limit)
  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 5048576) {
    return callback(new Error("File size is too large"));
  }

  callback(null, true);
};

// Create the upload middleware using multer
export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5048576 },  // 5 MB size limit
});
