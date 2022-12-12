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
      object.productId = products[i].product_id;
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
    console.log(orderItems);
    if (error) return res.status(400).json({ error: error });
    if (orderItems) {
      res.status(201).json({
        message: "Order Successful",
        orderItems: orderItems,
      });
    }
  });
};
