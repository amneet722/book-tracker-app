// server/controllers/bookController.js
const pool = require('../db'); // Assuming pool is your DB connection
const { getBooksByUser, addBook, updateBookById, deleteBookById } = require('../models/Book'); // Assuming these are in Book.js

// GET all books for the logged-in user
const getAllBooks = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from authenticated request
    const books = await getBooksByUser(userId); // Fetch books by user ID
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

// POST new book for the logged-in user
const createBook = async (req, res) => {
  const { title, author, status, rating, review } = req.body;
  const userId = req.user.id; // Get user ID from authenticated request
  try {
    const newBook = await addBook(userId, { title, author, status, rating, review }); // Pass user ID
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

// PUT update book for the logged-in user
const updateBook = async (req, res) => {
  const { id } = req.params; // Book ID
  const { title, author, status, rating, review } = req.body;
  const userId = req.user.id; // Get user ID from authenticated request
  try {
    // You'll need a model function like updateBookById that also checks user_id
    const updatedBook = await updateBookById(id, userId, { title, author, status, rating, review });
    if (!updatedBook) {
      return res.status(404).json({ error: 'Book not found or unauthorized' });
    }
    res.json(updatedBook);
  } catch (err) {
    console.error('Error updating book:', err);
    res.status(500).json({ error: 'Failed to update book' });
  }
};

// DELETE book for the logged-in user
const deleteBook = async (req, res) => {
  const { id } = req.params; // Book ID
  const userId = req.user.id; // Get user ID from authenticated request
  try {
    // You'll need a model function like deleteBookById that also checks user_id
    const deleted = await deleteBookById(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found or unauthorized' });
    }
    res.status(204).send(); // No content for successful deletion
  } catch (err) {
    console.error('Error deleting book:', err);
    res.status(500).json({ error: 'Failed to delete book' });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
};