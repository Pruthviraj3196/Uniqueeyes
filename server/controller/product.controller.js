const Product = require('../model/product.model');

const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find(); // Corrected to use 'Product' instead of 'product'
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllProduct,
};
