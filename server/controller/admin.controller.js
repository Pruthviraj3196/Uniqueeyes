const Product = require('../model/product.model.js');
// const Cart = require('../model/cart.model');

const addProduct = async (req, res) => {
    const { productName, type, subtype, description, price, imageid } = req.body;
    const newProduct = new Product({
        productName,
        type,
        subtype,
        price,
        description,
        imageid,
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
const deleteProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request params
    try {
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  module.exports ={
    addProduct ,
    deleteProduct,
  }