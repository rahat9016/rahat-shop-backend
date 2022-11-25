const express = require("express");
const {
  allProducts,
  getProductsByCategoryId,
  getProductBySearch,
} = require("../Controller/initiateData");
const router = express.Router();

router.post("/allProducts", allProducts);
router.get(
  "/getProductsByCategoryId/:categoryId/:perPage/:page",
  getProductsByCategoryId
);
router.post("/search/getProduct", getProductBySearch);
module.exports = router;
