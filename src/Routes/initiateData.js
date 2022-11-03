const express = require("express");
const {
  allProducts,
  getProductsByCategoryId,
} = require("../Controller/initiateData");
const router = express.Router();

router.post("/allProducts", allProducts);
router.get(
  "/getProductsByCategoryId/:categoryId/:perPage/:page",
  getProductsByCategoryId
);

module.exports = router;
