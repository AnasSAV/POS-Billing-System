const db = require('../db');  // Ensure correct import
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Get all products
exports.getAllProducts = async (req, res) => {

        const [products] = await db.query('SELECT * FROM Products');
        res.json(products);

};

exports.createProduct = async (req, res) => {
    const { name, barcode, price, stock_quantity} = req.body;
  

      await db.query(
        'INSERT INTO products (name, barcode, price, stock_quantity) VALUES (?, ?, ?, ?)',
        [name, barcode, price, stock_quantity]
      );
      res.status(201).json({ message: 'Product created successfully.' });

  };