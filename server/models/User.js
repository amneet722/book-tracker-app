const pool = require('../db');

const createUser = async (name, username, email, password) => {
  const result = await pool.query(
    'INSERT INTO users (name, username, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, username, email', // Return specific user data
    [name, username, email, password]
  );
  return result.rows[0];
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM users WHERE email = $1',
    [email]
  );
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(
    'SELECT id, name, username, email FROM users WHERE id = $1',
    [id]
  );
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById // New export
};