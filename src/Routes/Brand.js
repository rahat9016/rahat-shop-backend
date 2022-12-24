const express = require("express");
const {
  requireSigning,
  adminMiddleware,
} = require("../Common-middleware/userMiddleware");
const { brandCreate, getAllBrand } = require("../Controller/Admin/Brand");
const router = express.Router();
router.post("/brand/create", requireSigning, adminMiddleware, brandCreate);
router.get("/get-brand", getAllBrand);

module.exports = router;
