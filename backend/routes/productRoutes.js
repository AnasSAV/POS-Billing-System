import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { getAllProducts, createProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/products-get', authMiddleware, getAllProducts);
router.post('/products-create', authMiddleware, createProduct);

export default router;
