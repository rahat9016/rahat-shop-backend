const Order = require("../Models/Order");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
  // console.log("Id ----->", req.body.id);
  const orderItems = await Order.find({
    $and: [{ _id: req.body.id }, { orderBy: req.user._id }],
  });
  let finalAmount = 0;
  if (orderItems[0].totalAmount > orderItems[0].totalAfterDiscount) {
    finalAmount = orderItems[0].totalAfterDiscount;
  } else {
    finalAmount = orderItems[0].totalAmount;
  }
  const paymentIntent = await stripe.paymentIntents.create({
    amount: finalAmount * 100,
    currency: "usd",
  });
  res.send({
    clientSecret: paymentIntent.client_secret,
  });
};

exports.updatePaymentInOrder = async (req, res) => {
  try {
    const { id, paymentIntent } = req.body;
    await Order.findOneAndUpdate(
      { _id: id },
      { paymentIntent: paymentIntent }
    ).exec((error, update) => {
      if (error) return res.status(400).json({ error: error });
      if (update) {
        res.status(200).json({
          message: "Payment Successful",
          updateOrder: update,
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
