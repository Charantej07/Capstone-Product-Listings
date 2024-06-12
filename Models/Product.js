const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  p_id: {
    type: Number,
    required: true,
    unique: true,
  },
  p_name: {
    type: String,
    required: true,
  },
  p_cost: {
    type: Number,
    required: true,
  },
  p_cat: {
    type: String,
    required: true,
  },
  p_desc: {
    type: String,
    required: true,
  },
  p_img: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
