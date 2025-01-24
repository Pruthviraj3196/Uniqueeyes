const express = require('express');
const { addToCart, getTheCart, deleteAllCartItems } = require('../controller/cart.controller');

const router = express.Router();

router.post('/addtocart', addToCart);
router.get('/getthecart', getTheCart);
router.delete('/deleteCart',deleteAllCartItems)

module.exports = router;