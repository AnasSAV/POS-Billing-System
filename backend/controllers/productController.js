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
