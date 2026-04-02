const mongoose = require('moongose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "Unnamed product"
  },
  description: {
    type: String,
    required: true,
    default: "Product description"
  },
  image: {
    type: Image,
    required: true,
    default: "Product image"
  },
  category: {
    type: String,
    required: true,
    default: "Product category"
  },
  size: {
    type: String,
    required: true,
    default: "Product size"
  },
  prize: {
    type: Number,
    required: true,
    default: "Product price"
  } 
}, { timestamps: true});

module.exports = moongose.model("Product", ProductSchema);