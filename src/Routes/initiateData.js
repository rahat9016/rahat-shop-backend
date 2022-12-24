const express = require("express");
const {
  getProductsByCategoryId,
  getProductBySearch,
  bestSelling,
  products,
} = require("../Controller/initiateData");
const router = express.Router();

router.post("/bestSelling", bestSelling);
router.get("/products", products);
router.get(
  "/getProductsByCategoryId/:categoryId/:perPage/:page",
  getProductsByCategoryId
);
router.post("/search/getProduct", getProductBySearch);
module.exports = router;
