const Coupon = require("../../Models/Coupon");

exports.coupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const newCoupon = await new Coupon({ name, expiry, discount });
    newCoupon.save((error, data) => {
      if (error) {
        if (error.keyPattern.name > 0) {
          res.status(400).json({ message: "Already created!" });
        } else {
          res.status(400).json(error);
        }
      } else if (data) {
        res.status(201).json({ message: "coupon created!" });
      }
    });
  } catch (error) {}
};
exports.getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    if (coupon) {
      res.status(200).json({ coupon });
    }
  } catch (error) {}
};
exports.deleteCoupon = async (req, res) => {
  try {
    await Coupon.findByIdAndDelete(req.params.couponId).exec(
      (error, deleteCoupon) => {
        res.status(200).json({ message: "coupon deleted!" });
      }
    );
  } catch (error) {}
};
exports.applyCouponToUser = async (req, res) => {
  try {
    const { coupon, totalAmount } = req.body;
    const validCoupon = await Coupon.findOne({ name: coupon });
    if (validCoupon === null) {
      res.status(400).json({ message: "Invalid coupon" });
    }
    const totalAmountAfterDiscount = (
      totalAmount -
      (totalAmount * validCoupon.discount) / 100
    ).toFixed(2);
    res.status(200).json({ afterDiscount: parseInt(totalAmountAfterDiscount) });
  } catch (error) {}
};
