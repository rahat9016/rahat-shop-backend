const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 25,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      min: 2,
    },
    role: {
      type: String,
      required: true,
      enum: ["user", "admin"],
      default: "admin",
    },
    number: {
      type: String,
      unique: true,
    },
    profilePicture: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
