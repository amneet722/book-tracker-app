
const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  createBook,
  updateBook,
  deleteBook
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware'); 


router.get('/', authMiddleware, getAllBooks); 
router.post('/', authMiddleware, createBook);  
router.put('/:id', authMiddleware, updateBook); 
router.delete('/:id', authMiddleware, deleteBook); 

module.exports = router;