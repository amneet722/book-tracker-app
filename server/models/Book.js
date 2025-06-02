// server/models/Book.js (Example - adjust if your file is named differently or structured)
const pool = require('../db');

const getBooksByUser = async (userId) => {
  const result = await pool.query('SELECT * FROM books WHERE user_id = $1 ORDER BY created_at DESC', [userId]);
  return result.rows;
};

const addBook = async (userId, { title, author, status, rating, review }) => {
  const result = await pool.query(
    'INSERT INTO books (user_id, title, author, status, rating, review) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [userId, title, author, status, rating, review]
  );
  return result.rows[0];
};

const updateBookById = async (bookId, userId, { title, author, status, rating, review }) => {
  const result = await pool.query(
    'UPDATE books SET title = $1, author = $2, status = $3, rating = $4, review = $5 WHERE id = $6 AND user_id = $7 RETURNING *',
    [title, author, status, rating, review, bookId, userId]
  );
  return result.rows[0]; // Will be undefined if no book found/updated (due to wrong ID or user_id mismatch)
};

const deleteBookById = async (bookId, userId) => {
  const result = await pool.query('DELETE FROM books WHERE id = $1 AND user_id = $2 RETURNING id', [bookId, userId]);
  return result.rows.length > 0; // True if a row was deleted
};

module.exports = {
  getBooksByUser,
  addBook,
  updateBookById,
  deleteBookById,
};