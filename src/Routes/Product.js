const express = require("express");
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
  productCount,
  filterProducts,
  productStart,
  relatedProduct,
} = require("../Controller/Admin/Product");

const router = express.Router();
router.post(
  "/admin/product/create",
  requireSigning,
  adminMiddleware,
  addProduct
);

router.get("/get-all-products", getAllProducts);
router.get("/product/:id", getProductById);
router.get("/product/related/:productId", relatedProduct);
router.get("/products/total", productCount);
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
  updateProduct
);
router.put(
  "/product/start/:productId",
  requireSigning,
  userMiddleware,
  productStart
);
module.exports = router;
