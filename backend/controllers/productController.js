const db = require('../db').default;  
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.getAllProducts = async (req, res) => {
    try {
        const searchQuery = req.query.search ? `%${req.query.search}%` : '%';

        const [products] = await db.query(
            'SELECT * FROM Products WHERE name LIKE ?',
            [searchQuery]
        );

        res.json(products);
    } catch (error) {
        console.error("❌ Error fetching products:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

exports.createProduct = async (req, res) => {
    const { name, barcode, price, stock_quantity } = req.body;

    if (!name || !barcode || !price || !stock_quantity) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        await db.query(
            'INSERT INTO products (name, barcode, price, stock_quantity) VALUES (?, ?, ?, ?)',
            [name, barcode, price, stock_quantity]
        );

        res.status(201).json({ message: "✅ Product created successfully." });
    } catch (error) {
        console.error("❌ Error creating product:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
