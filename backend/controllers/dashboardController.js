import pool from '../db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.JWT_SECRET) {
    console.error('JWT_SECRET is not defined in environment variables');
    process.exit(1);
}

// Utility function for token verification
const verifyAdminToken = async (token) => {
    if (!token) {
        throw new Error('No token provided');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
        throw new Error('Access denied: Admin only');
    }
    return decoded;
};

// Get weekly customer count
export const getWeeklyCustomers = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        const result = await pool.query('SELECT * FROM get_weekly_customers()');
        res.json({ weeklyCustomers: parseInt(result.rows[0]?.count || 0) });
    } catch (error) {
        console.error('Weekly customers error:', error);
        res.status(401).json({ error: error.message });
    }
};

// Get daily customer traffic
export const getDailyTraffic = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        const result = await pool.query('SELECT * FROM get_daily_customer_traffic()');
        res.json({
            dailyCustomers: result.rows.map(row => ({
                date: row.date,
                count: parseInt(row.count)
            }))
        });
    } catch (error) {
        console.error('Daily traffic error:', error);
        res.status(401).json({ error: error.message });
    }
};

// Get sales distribution data
export const getSalesDistribution = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        const result = await pool.query('SELECT * FROM get_sales_distribution()');
        res.json({
            salesData: result.rows.map(row => ({
                name: row.category || 'Uncategorized',
                value: parseFloat(row.total_sales || 0)
            }))
        });
    } catch (error) {
        console.error('Sales distribution error:', error);
        res.status(401).json({ error: error.message });
    }
};

// Get inventory status
export const getInventoryStatus = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        const result = await pool.query('SELECT * FROM get_low_stock_products()');
        
        const productInventory = result.rows.map(product => ({
            id: product.id,
            name: product.name,
            stock: parseInt(product.stock),
            price: parseFloat(product.price || 0)
        }));

        res.json({
            productInventory,
            lowStockProducts: productInventory.filter(product => product.stock < 10)
        });
    } catch (error) {
        console.error('Inventory status error:', error);
        res.status(401).json({ error: error.message });
    }
};

// Get customer comments
export const getCustomerComments = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        const result = await pool.query('SELECT * FROM get_customer_comments()');
        res.json({
            customerComments: result.rows.map(row => ({
                id: row.id,
                content: row.content,
                date: new Date(row.created_at).toISOString().split('T')[0],
                customer: row.username || 'Anonymous'
            }))
        });
    } catch (error) {
        console.error('Comments error:', error);
        res.status(401).json({ error: error.message });
    }
};

// Get all dashboard stats combined
export const getDashboardStats = async (req, res) => {
    try {
        await verifyAdminToken(req.headers.authorization?.split(' ')[1]);
        
        const queries = [
            'SELECT * FROM get_weekly_customers()',
            'SELECT * FROM get_daily_customer_traffic()',
            'SELECT * FROM get_sales_distribution()',
            'SELECT * FROM get_low_stock_products()',
            'SELECT * FROM get_customer_comments()'
        ];

        const [
            weeklyCustomers,
            dailyCustomers,
            salesData,
            lowStock,
            comments
        ] = await Promise.all(
            queries.map(query => pool.query(query))
        );

        res.json({
            weeklyCustomers: parseInt(weeklyCustomers.rows[0]?.count || 0),
            dailyCustomers: dailyCustomers.rows.map(row => ({
                date: row.date,
                count: parseInt(row.count)
            })),
            productInventory: lowStock.rows.map(product => ({
                id: product.id,
                name: product.name,
                stock: parseInt(product.stock),
                price: parseFloat(product.price || 0)
            })),
            lowStockProducts: lowStock.rows
                .filter(product => product.stock < 10)
                .map(product => ({
                    id: product.id,
                    name: product.name,
                    stock: parseInt(product.stock)
                })),
            salesData: salesData.rows.map(row => ({
                name: row.category || 'Uncategorized',
                value: parseFloat(row.total_sales || 0)
            })),
            customerComments: comments.rows.map(row => ({
                id: row.id,
                content: row.content,
                date: new Date(row.created_at).toISOString().split('T')[0],
                customer: row.username || 'Anonymous'
            }))
        });
    } catch (error) {
        console.error('Dashboard stats error:', error);
        res.status(401).json({ error: error.message });
    }
};
