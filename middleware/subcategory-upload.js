import multer from "multer";
import fs from "fs-extra";
import Path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let path = Path.join("uploads", "subcategories");

    if (!fs.existsSync(path)) {
      console.log("Folder is created");
      fs.mkdirsSync(path);
    }

    cb(null, path);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, callback) => {
  const acceptableExt = [".png", ".jpg", ".jpeg", ".svg"];

  if (!acceptableExt.includes(Path.extname(file.originalname))) {
    return callback(new Error("Only .png, .jpg, .jpeg, .svg formats are allowed"));
  }

  const fileSize = parseInt(req.headers["content-length"]);
  if (fileSize > 5048576) {
    return callback(new Error("File size is too large"));
  }

  callback(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5048576 },
});
