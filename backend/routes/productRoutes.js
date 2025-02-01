const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllProducts, createProduct } = require('../controllers/productController');

const router = express.Router();


router.get('/products-get', authMiddleware, getAllProducts);
router.post('/products-create', authMiddleware, createProduct);

module.exports = router;
