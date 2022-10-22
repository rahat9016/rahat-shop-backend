const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minlength: [2, "Too short"],
    maxlength: [32, "Too Long"],
  },
  slug: {
    type: String,
    unique: true,
  },
  categoryImg: {
    type: String,
  },
  parentId: {
    type: String,
  },
});

module.exports = mongoose.model("Category", categorySchema);
