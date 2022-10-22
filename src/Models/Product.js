const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      text: true,
    },
    price: {
      type: Number,
      required: true,
    },
    productPictures: [{ img: { type: String } }],
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    review: [
      {
        postBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        review: Number,
      },
    ],
    brand: {
      type: String,
      text: true,
    },
    color: {
      type: String,
    },
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Product", productSchema);
