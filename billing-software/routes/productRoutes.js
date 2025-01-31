const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getAllProducts } = require('../controllers/productController');

const router = express.Router();

// Get all products (Protected Route)
router.get('/products', authMiddleware, getAllProducts);

module.exports = router;
