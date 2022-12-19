const express = require("express");
const {
  requireSigning,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const { createPayment, updatePaymentInOrder } = require("../Controller/stripe");
const router = express.Router();

router.post("/create-payment", requireSigning, userMiddleware, createPayment);
router.put(
  "/create-payment",
  requireSigning,
  userMiddleware,
  updatePaymentInOrder
);

module.exports = router;
