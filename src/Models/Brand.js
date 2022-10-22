const mongoose = require("mongoose");

const BrandSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, "Too short"],
    maxlength: [80, "Too Long"],
  },
});
