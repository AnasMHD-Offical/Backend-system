const multer = require("multer");
const path = require("path");
const fs = require("fs")

const ensureDirectoryExists = (directory) => {
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }
  };
  

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = path.join(__dirname, "uploads");
        ensureDirectoryExists(uploadDir);
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        console.log(file);
        
        const name = Date.now() + "-" + file.originalname;
        cb(null, name);
    },
});

const upload = multer({ storage: storage }).single("profile")

module.exports = { upload };