const express = require("express");
const {
  requireSigning,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const { userCart, getUserCart } = require("../Controller/cart");
const router = express.Router();

router.post("/user/cart", requireSigning, userMiddleware, userCart);
router.get("/user/cart", requireSigning, userMiddleware, getUserCart);

module.exports = router;
