const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Too short"],
      maxlength: [32, "Too Long"],
      unique: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    brandLogo: {
      type: String,
    },
    brandCover: [{ img: { type: String } }],
    description: {
      type: String,
    },
    createBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Brand", brandSchema);
