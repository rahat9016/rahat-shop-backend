const Coupon = require("../../Models/Coupon");

exports.coupon = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const newCoupon = await new Coupon({ name, expiry, discount });
    newCoupon.save((error, data) => {
      res.status(201).json({ message: "coupon created!" });
    });
  } catch (error) {
    console.log(error);
  }
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
