const express = require("express");
const router = express.Router();
const { upload } = require("../Common-middleware/fileUpload");
const {
  adminMiddleware,
  requireSigning,
} = require("../Common-middleware/userMiddleware");

router.post("/uploadImages", requireSigning, adminMiddleware, upload);
module.exports = router;
