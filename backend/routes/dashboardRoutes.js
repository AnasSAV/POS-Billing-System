import express from 'express';
import { 
    getWeeklyCustomers,
    getDailyTraffic,
    getSalesDistribution,
    getInventoryStatus,
    getCustomerComments
} from '../controllers/dashboardController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Individual endpoints
router.get('/stats/weekly-customers', authMiddleware, getWeeklyCustomers);
router.get('/stats/daily-traffic', authMiddleware, getDailyTraffic);
router.get('/stats/sales-distribution', authMiddleware, getSalesDistribution);
router.get('/stats/inventory', authMiddleware, getInventoryStatus);
router.get('/stats/comments', authMiddleware, getCustomerComments);

export default router;