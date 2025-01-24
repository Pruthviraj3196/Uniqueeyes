const Cart = require('../model/cart.model');
const Product = require('../model/product.model');

const getTheCart= async (req, res) => {
    try {
      const cart = await Cart.find().populate('productId');
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json(err);
    }
  };


  const deleteAllCartItems = async (req, res) => {
    try {
      // Clear the cart for the user
      const result = await Cart.deleteMany({});  // Empty cart by removing all items
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No items to delete.' });
      }
  
      return res.status(200).json({ message: 'Cart cleared successfully.' });
    } catch (error) {
      console.error('Error clearing the cart:', error);
      return res.status(500).json({ message: 'Failed to clear the cart.' });
    }
  };
  

// Add product to the cart
const addToCart = async (req, res) => {
  const { cartItems } = req.body; // Expecting an array of cart items

  try {
    const cartResponse = [];

    // Loop through all items in the cart and add to the database
    for (let item of cartItems) {
      const { id, quantity } = item;

      // Check if the product exists in the Product model
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ message: 'Product not found for id: ' + id });
      }

      // Check if the product is already in the cart
      let existingCartItem = await Cart.findOne({ productId: id });

      if (existingCartItem) {
        // If the product is already in the cart, update the quantity
        existingCartItem.quantity += quantity || 1;
        await existingCartItem.save();
        cartResponse.push(existingCartItem);
      } else {
        // Add the new product to the cart
        const cartItem = new Cart({
          productId: id,
          quantity: quantity || 1,
        });

        await cartItem.save();
        cartResponse.push(cartItem);
      }
    }

    // Return a success response with the updated cart items
    return res.status(201).json({
      message: 'Products added to cart successfully',
      cartItems: cartResponse,
    });
  } catch (error) {
    console.error('Error adding products to cart:', error);
    return res.status(500).json({ message: 'Internal server error', error });
  }
};

module.exports = {
    getTheCart,
    addToCart,
    deleteAllCartItems,
}