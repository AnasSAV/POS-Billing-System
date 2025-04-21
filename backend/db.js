import dotenv from 'dotenv';
dotenv.config();
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5000
});
(async () => {
  try {
    const client = await pool.connect();
    console.log("✅ PostgreSQL Connected!");
    client.release();
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
  }
})();

export default pool;
