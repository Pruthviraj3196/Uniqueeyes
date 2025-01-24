const express = require('express');
const { deleteProduct ,addProduct } = require('../controller/admin.controller');
const router = express.Router();

router.post('/add', addProduct);
router.delete('/delete/:id', deleteProduct);

module.exports = router;