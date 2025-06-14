import React, { useState, useEffect, useReducer } from 'react';
import axios from '../api'; 
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';
import ReadingGoals from '../components/ReadingGoals';
import ReadingStats from '../components/ReadingStats';
import './Dashboard.css';

const bookReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, books: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'ADD_BOOK':
      return { ...state, books: [...state.books, action.payload] };
    case 'UPDATE_BOOK':
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id ? action.payload : book
        ),
      };
    case 'DELETE_BOOK':
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
};

function Dashboard() {
  const [state, dispatch] = useReducer(bookReducer, {
    books: [],
    loading: false,
    error: null,
  });
  const { books, loading, error } = state;

  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStatus, setFilteredStatus] = useState('All');
  const [user, setUser] = useState(null); 

  
  const fetchUserData = async () => {
    try {
      const res = await axios.get('/auth/me'); 
      setUser(res.data);
    } catch (err) {
      console.error('Failed to fetch user data:', err);
    }
  };

  const fetchBooks = async () => {
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await axios.get('/books');
      dispatch({ type: 'FETCH_SUCCESS', payload: res.data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to fetch books.' });
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      await axios.delete(`/books/${id}`);
      dispatch({ type: 'DELETE_BOOK', payload: id });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: 'Failed to delete book.' });
    }
  };

  const handleSave = async (bookData, id = null) => {
    dispatch({ type: 'CLEAR_ERROR' });
    try {
      if (id) {
        const res = await axios.put(`/books/${id}`, bookData);
        dispatch({ type: 'UPDATE_BOOK', payload: res.data });
      } else {
        const res = await axios.post('/books', bookData);
        dispatch({ type: 'ADD_BOOK', payload: res.data });
      }
      setShowForm(false);
      setEditingBook(null);
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR', payload: `Failed to ${id ? 'update' : 'add'} book.` });
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (book.author && book.author.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchStatus = filteredStatus === 'All' || book.status === filteredStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="dashboard">
      {/* Display user's name */}
      <h2 className="dashboard-title">Welcome, {user ? user.name : 'Reader'}!</h2>
      <p className="dashboard-subtitle">Your personal book tracking hub.</p>

      {/* Reading Goals and Stats Section */}
      <div className="stats-section">
        <h3>Your Reading Progress</h3>
        <ReadingGoals books={books} />
        <ReadingStats books={books} />
      </div>

      <div className="controls">
        <button className="add-book-btn" onClick={() => {
          setEditingBook(null);
          setShowForm(true);
          dispatch({ type: 'CLEAR_ERROR' });
        }}>
          + Add Book
        </button>

        <input
          type="text"
          placeholder="Search by title or author..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={filteredStatus}
          onChange={(e) => setFilteredStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Wishlist">Wishlist</option>
          <option value="Currently Reading">Currently Reading</option>
          <option value="Read">Read</option>
        </select>
      </div>

      {showForm && (
        <BookForm
          book={editingBook}
          onSave={handleSave}
          onClose={() => {
            setShowForm(false);
            setEditingBook(null);
            dispatch({ type: 'CLEAR_ERROR' });
          }}
        />
      )}

      {loading && <p className="loading-message">Loading books...</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="book-grid">
        {!loading && !error && filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onDelete={handleDelete}
              onEdit={(bookToEdit) => {
                setEditingBook(bookToEdit);
                setShowForm(true);
                dispatch({ type: 'CLEAR_ERROR' });
              }}
            />
          ))
        ) : (!loading && !error && filteredBooks.length === 0) ? (
          <p className="no-books">No books found. Add your first book!</p>
        ) : null}
      </div>
    </div>
  );
}

export default Dashboard;