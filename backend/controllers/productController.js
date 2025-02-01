const db = require('../db').default;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get all products
exports.getAllProducts = async (req, res) => {
    try {
        const [products] = await db.query('SELECT * FROM Products');
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Error fetching products' });
    }
};

exports.createProduct = async (req, res) => {
    const { name, barcode, price, stock_quantity} = req.body;
  

      await db.query(
        'INSERT INTO products (name, barcode, price, stock_quantity) VALUES (?, ?, ?, ?)',
        [name, barcode, price, stock_quantity]
      );
      res.status(201).json({ message: 'Product created successfully.' });

  };