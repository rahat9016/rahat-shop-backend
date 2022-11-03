const express = require("express");
const { upload } = require("../Common-middleware/fileUpload");
const {
  requireSigning,
  adminMiddleware,
} = require("../Common-middleware/userMiddleware");
const { brandCreate, getAllBrand } = require("../Controller/Admin/Brand");
const router = express.Router();
router.post(
  "/brand/create",
  requireSigning,
  adminMiddleware,
  upload.fields([{ name: "brandLogo" }, { name: "brandCover" }]),
  brandCreate
);
router.get("/get-brand", getAllBrand);

module.exports = router;
