const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Referencing the Product model
    required: true,
  },
  quantity: {
    type: Number, // Use Number for quantity
    default: 1,
  },
});

module.exports = mongoose.model('Cart', CartSchema);
