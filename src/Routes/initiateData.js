const express = require("express");
const { allProducts } = require("../Controller/initiateData");
const router = express.Router();

router.post("/allProducts", allProducts);

module.exports = router;
