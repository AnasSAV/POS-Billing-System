const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllProducts } = require('../controllers/productController');
const { createProduct } = require('../controllers/productController');

const router = express.Router();

// Get all products (Protected Route)
router.get('/products-get', authMiddleware, getAllProducts);
router.post('/products-create', authMiddleware, createProduct);

module.exports = router;
