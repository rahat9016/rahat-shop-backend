const express = require("express");
const {
  requireSigning,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const { createOrder, getOrder } = require("../Controller/order");

const router = express.Router();

// User Order
router.post("/user/order", requireSigning, userMiddleware, createOrder);
router.get("/user/order", requireSigning, userMiddleware, getOrder);
module.exports = router;
