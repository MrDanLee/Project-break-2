const mongoose = require('mongoose');

const validCategories = ['Camisetas', 'Pantalones', 'Zapatos', 'Accesorios', 'Abrigos'];
const validSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: validCategories,
  },
  size: {
    type: String,
    required: true,
    enum: validSizes,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
module.exports.validCategories = validCategories;
module.exports.validSizes = validSizes;