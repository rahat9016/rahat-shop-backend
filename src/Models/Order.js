const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        productId: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    totalAfterDiscount: {
      type: Number,
      required: true,
    },
    orderBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    paymentIntent: {},
    customerInformation: {
      firstName: String,
      lastName: String,
      mobile: Number,
      city: String,
      zone: String,
      fullAddress: String,
    },
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed",
      ],
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Order", orderSchema);
