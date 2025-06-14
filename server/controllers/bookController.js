const pool = require('../db');
const { getBooksByUser, addBook, updateBookById, deleteBookById } = require('../models/Book');

const getAllBooks = async (req, res) => {
  try {
    const userId = req.user.id;
    const books = await getBooksByUser(userId); 
    res.json(books);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
};

const createBook = async (req, res) => {
  const { title, author, status, rating, review } = req.body;
  const userId = req.user.id;
  try {
    const newBook = await addBook(userId, { title, author, status, rating, review });
    res.status(201).json(newBook);
  } catch (err) {
    console.error('Error adding book:', err);
    res.status(500).json({ error: 'Failed to add book' });
  }
};

const updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, status, rating, review } = req.body;
  const userId = req.user.id;
  try {
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

const deleteBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id; 
  try {
    const deleted = await deleteBookById(id, userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found or unauthorized' });
    }
    res.status(204).send();
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