const { Pool } = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const pool = new Pool({
  user: process.env.DB_USER || 'postgres', 
  password: process.env.DB_PASSWORD,      
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_DATABASE || 'booktracker',
});

const connectDB = async () => {
  try {
    await pool.connect();
    console.log('✅ PostgreSQL connected');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        username VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    await pool.query(`
      CREATE TABLE IF NOT EXISTS books (
        id SERIAL PRIMARY KEY,
        user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        author VARCHAR(255),
        status VARCHAR(50) DEFAULT 'Wishlist',
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        review TEXT,
        genre VARCHAR(100),
        cover_url VARCHAR(255),
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('✅ Database tables checked/created.');
  } catch (err) {
    console.error('❌ DB connection or table creation error:', err.message);
    process.exit(1);
  }
};

module.exports = {
  query: (text, params) => pool.query(text, params),
  connectDB,
};