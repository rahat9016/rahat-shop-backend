const express = require("express");
const {
  requireSigning,
  adminMiddleware,
} = require("../Common-middleware/userMiddleware");
const {
  coupon,
  getCoupon,
  deleteCoupon,
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

module.exports = router;
