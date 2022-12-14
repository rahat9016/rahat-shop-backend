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
    sold: {
      type: Number,
      default: 0,
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
    productPictures: [{ url: { type: String }, public_key: { type: String } }],
    keyFeatures: [
      {
        key: {
          type: String,
        },
      },
    ],
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
    reviews: [
      {
        postedBy: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        star: Number,
        comment: String,
      },
    ],
    brand: {
      type: mongoose.Types.ObjectId,
      ref: "Brand",
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
