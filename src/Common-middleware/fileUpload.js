const multer = require("multer");
const path = require("path");
const shortid = require("shortid");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const fileLocation = path.join(path.dirname(__dirname), "uploads");
    cb(null, fileLocation);
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});
exports.upload = multer({ storage: storage });
