import pkg from 'pg';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

const { Pool } = pkg;
dotenv.config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 5000
});

async function hashPasswords() {
  try {
    const result = await pool.query('SELECT id, password FROM users');
    const users = result.rows;

    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await pool.query(
        'UPDATE users SET password = $1 WHERE id = $2',
        [hashedPassword, user.id]
      );
    }
    console.log('✅ Passwords hashed successfully.');
  } catch (error) {
    console.error('❌ Error hashing passwords:', error);
  } finally {
    await pool.end();
    process.exit();
  }
}

hashPasswords();