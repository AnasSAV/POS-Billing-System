const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');
const router = express.Router();

// Get all products (Protected Route)
router.get('/products-get', authMiddleware, productController.getAllProducts);
router.post('/products-create', authMiddleware, productController.createProduct);
router.post('/products-update', authMiddleware, productController.updateProduct);

module.exports = router;
