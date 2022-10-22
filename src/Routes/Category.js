const express = require("express");
const { upload } = require("../Common-middleware/fileUpload");
const {
  requireSigning,
  adminMiddleware,
} = require("../Common-middleware/userMiddleware");
const {
  addCategory,
  getCategory,
  updateCategory,
  deleteCategories,
  getCategoryById,
} = require("../Controller/Admin/Category");

const router = express.Router();
router.post(
  "/admin/category/create",
  requireSigning,
  adminMiddleware,
  upload.single("categoryImage"),
  addCategory
);
router.get("/category/getCategory", getCategory);
router.get("/category/:id", getCategoryById);
router.post(
  "/admin/category/update",
  requireSigning,
  adminMiddleware,
  upload.array("categoryImage"),
  updateCategory
);
router.post(
  "/admin/category/delete",
  requireSigning,
  adminMiddleware,
  deleteCategories
);

module.exports = router;
