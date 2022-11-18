const express = require("express");
const { upload } = require("../Common-middleware/fileUpload");
const {
  requireSigning,
  adminMiddleware,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const {
  addProduct,
  getAllProducts,
  deleteProduct,
  getProductById,
  updateProduct,
  list,
  productCount,
  filterProducts,
  productStart,
} = require("../Controller/Admin/Product");

const router = express.Router();
router.post(
  "/admin/product/create",
  requireSigning,
  adminMiddleware,
  upload.array("productPictures"),
  addProduct
);
router.get("/get-all-products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/products/total", productCount);
// router.post("/products", list);
router.post("/products", filterProducts);

router.delete(
  "/admin/product/delete/:id",
  requireSigning,
  adminMiddleware,
  deleteProduct
);
router.put(
  "/admin/product/update/:id",
  requireSigning,
  adminMiddleware,
  upload.array("productPictures"),
  updateProduct
);
router.put(
  "/product/start/:productId",
  requireSigning,
  userMiddleware,
  productStart
);
module.exports = router;
