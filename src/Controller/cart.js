const Cart = require("../Models/Cart");
const User = require("../Models/User");

exports.userCart = async (req, res) => {
  const { cart } = req.body;
  let products = [];
  // find user by req
  const emailID = req.user._id;

  const user = await User.findOne({ _id: emailID }).exec();

  // check exits cart item
  const cartExitsByUser = await Cart.findOne({ OrderedBy: user._id }).exec();
  if (cartExitsByUser) {
    cartExitsByUser.remove();
  } else {
    for (let i = 0; i < cart.length; i++) {
      let object = {};
      object.productId = cart[i].product_id;
      object.quantity = cart[i].quantity;
      object.price = cart[i].price;
      products.push(object);
    }
    let cartTotal = 0;
    for (let i = 0; i < products.length; i++) {
      cartTotal = cartTotal + products[i].price * products[i].quantity;
    }
    let newCart = await new Cart({
      products,
      cartTotal,
      OrderedBy: user._id,
    }).save();
    res.status(201).json({ newCart });
  }
};
exports.getUserCart = async (req, res) => {
  // find user by req
  const emailID = req.user._id;

  const user = await User.findOne({ _id: emailID }).exec();
  const cart = await Cart.findOne({ OrderedBy: user._id })
    .populate("products.productId", "_id, name, price, quantity")
    .exec();
  const { products, cartTotal, totalAfterDiscount } = cart;
  res.status(200).json({ products, cartTotal, totalAfterDiscount });
};
