// server/routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware'); // Import middleware

// Protect all book routes
router.get('/', authMiddleware, getAllBooks); // ADD authMiddleware
router.post('/', authMiddleware, createBook); // ADD authMiddleware
router.put('/:id', authMiddleware, updateBook); // ADD authMiddleware
router.delete('/:id', authMiddleware, deleteBook); // ADD authMiddleware

module.exports = router;