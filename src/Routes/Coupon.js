const express = require("express");
const {
  requireSigning,
  adminMiddleware,
  userMiddleware,
} = require("../Common-middleware/userMiddleware");
const {
  coupon,
  getCoupon,
  deleteCoupon,
  applyCouponToUser,
} = require("../Controller/Admin/Coupon");
const router = express.Router();

router.post("/coupon", requireSigning, adminMiddleware, coupon);
router.get("/coupon", getCoupon);
router.delete(
  "/coupon/:couponId",
  requireSigning,
  adminMiddleware,
  deleteCoupon
);
router.post("/coupon/apply", requireSigning, userMiddleware, applyCouponToUser);

module.exports = router;
