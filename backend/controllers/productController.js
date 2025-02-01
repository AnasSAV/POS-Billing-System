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

exports.updateProduct = async (req, res) => {
    const { id, price, stock_quantity } = req.body;

    try {
        await db.query(
        'UPDATE products SET price = ?, stock_quantity = ? WHERE id = ?',
        [price, stock_quantity, id]
        );
        res.json({ message: 'Product updated successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Server error.', error });
}
};