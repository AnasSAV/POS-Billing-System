import pool from '../db.js';

export const getAllProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let query = 'SELECT * FROM products';
        let params = [];

        if (search) {
            query += ' WHERE name ILIKE $1';
            params.push(`%${search}%`);
        }

        const result = await pool.query(query, params);
        res.json(result.rows);
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { name, barcode, price, stock_quantity } = req.body;
        const result = await pool.query(
            'INSERT INTO products (name, barcode, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, barcode, price, stock_quantity]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Error creating product' });
    }
};

import pool from '../db.js';

export const getDashboardStats = async (req, res) => {
    try {
        // Get weekly customers count (distinct transactions in 7 days)
        const weeklyCustomersQuery = `
            SELECT COUNT(*) as count
            FROM transactions
            WHERE date >= NOW() - INTERVAL '7 days'`;

        // Get daily customer traffic (number of transactions per day)
        const dailyTrafficQuery = `
            SELECT 
                DATE(date) as date,
                COUNT(*) as count
            FROM transactions
            WHERE date >= NOW() - INTERVAL '7 days'
            GROUP BY DATE(date)
            ORDER BY date`;

        // Get sales distribution - assuming categories not defined in schema, fallback to product names
        const salesDistributionQuery = `
            SELECT 
                p.name as name,
                SUM(ti.quantity * ti.price) as value
            FROM transaction_items ti
            JOIN products p ON ti.product_id = p.id
            JOIN transactions t ON ti.transaction_id = t.id
            WHERE t.date >= NOW() - INTERVAL '30 days'
            GROUP BY p.name`;

        // Get low stock products
        const lowStockQuery = `
            SELECT id, name, stock_quantity as stock
            FROM products
            WHERE stock_quantity < 10
            ORDER BY stock_quantity ASC`;

        // Get recent comments - assuming no comment table in schema, mock it empty
        const commentsQuery = `
            SELECT NULL as id, 'No comments found' as content, NOW() as date, 'System' as customer
            LIMIT 1`;

        const [
            weeklyCustomers,
            dailyTraffic,
            salesDistribution,
            lowStock,
            comments
        ] = await Promise.all([
            pool.query(weeklyCustomersQuery),
            pool.query(dailyTrafficQuery),
            pool.query(salesDistributionQuery),
            pool.query(lowStockQuery),
            pool.query(commentsQuery)
        ]);

        res.json({
            weeklyCustomers: weeklyCustomers.rows[0].count,
            dailyCustomers: dailyTraffic.rows,
            salesData: salesDistribution.rows,
            lowStockProducts: lowStock.rows,
            customerComments: comments.rows
        });
    } catch (error) {
        console.error('Error fetching dashboard stats:', error);
        res.status(500).json({ error: 'Error fetching dashboard statistics' });
    }
};
