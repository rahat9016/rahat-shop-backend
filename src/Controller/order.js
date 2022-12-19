const Order = require("../Models/Order");
const User = require("../Models/User");

exports.createOrder = async (req, res) => {
  const {
    products,
    totalAmount,
    totalAfterDiscount,
    paymentIntent,
    customerInformation,
  } = req.body;
  const user = await User.findOne({ _id: req.user._id }).exec();

  let productsArray = [];
  if (products) {
    for (let i = 0; i < products.length; i++) {
      let object = {};
      object.product = products[i].product._id;
      object.quantity = products[i].quantity;
      object.price = products[i].price;
      productsArray.push(object);
    }
  }
  let newOrder = await Order({
    products: productsArray,
    totalAmount,
    totalAfterDiscount,
    paymentIntent,
    customerInformation,
    orderBy: user._id,
  });
  newOrder.save((error, orderItems) => {
    if (error) return res.status(400).json({ error: error });
    if (orderItems) {
      res.status(201).json({
        message: "Order Successful",
        orderItems: orderItems,
      });
    }
  });
};
exports.getOrder = async (req, res) => {
  const user = await User.findOne({ _id: req.user._id }).exec();
  const orders = await Order.find({ orderBy: user._id })
    .populate("products.product", "_id name price ")
    .exec();
  res.status(200).json({ orders });
};
