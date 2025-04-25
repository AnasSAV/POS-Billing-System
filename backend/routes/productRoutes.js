import express from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { 
    getAllProducts, 
    createProduct, 
    getDashboardStats 
} from '../controllers/productController.js';

const router = express.Router();

router.get('/products-get', authMiddleware, getAllProducts);
router.post('/products-create', authMiddleware, createProduct);
router.get('/dashboard-stats', authMiddleware, getDashboardStats);

export default router;
