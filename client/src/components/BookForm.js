import React, { useState, useEffect } from 'react';

function BookForm({ book: initialBook = null, onSave, onClose }) { 
  const [title, setTitle] = useState(initialBook?.title || '');
  const [author, setAuthor] = useState(initialBook?.author || '');
  const [status, setStatus] = useState(initialBook?.status || 'Wishlist');
  const [rating, setRating] = useState(initialBook?.rating || '');
  const [review, setReview] = useState(initialBook?.review || '');

  // Effect to update form fields if initialBook changes (e.g., when editing a different book)
  useEffect(() => {
    setTitle(initialBook?.title || '');
    setAuthor(initialBook?.author || '');
    setStatus(initialBook?.status || 'Wishlist');
    setRating(initialBook?.rating || '');
    setReview(initialBook?.review || '');
  }, [initialBook]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title,
      author,
      status,
      rating: rating ? Number(rating) : null,
      review
    };
    onSave(payload, initialBook?.id); 
    onClose(); 
  };

  return (
    <form onSubmit={handleSubmit} className="book-form">
      <button type="button" onClick={onClose} className="form-close-btn">
        &times; 
      </button>
      <h3>{initialBook ? 'Edit Book' : 'Add New Book'}</h3>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Author" />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Wishlist">Wishlist</option>
        <option value="Currently Reading">Currently Reading</option>
        <option value="Read">Read</option>
      </select>
      <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (1–5)" min="1" max="5" />
      <textarea value={review} onChange={(e) => setReview(e.target.value)} placeholder="Write a review..." />
      <button type="submit">{initialBook ? 'Update' : 'Add'} Book</button>
    </form>
  );
}

export default BookForm;