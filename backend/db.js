require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Bravoomega@123',
  database: process.env.DB_NAME || 'pos_billing_system',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
(async () => {
  try {
      const connection = await pool.getConnection();
      console.log("✅ MySQL Connected!");
      connection.release();
  } catch (error) {
      console.error("❌ Database Connection Error:", error);
  }
})();
module.exports = pool;
