const express = require('express');
const {  getAllProduct } = require('../controller/product.controller');

const router = express.Router();

router.get('/', getAllProduct);

module.exports = router;