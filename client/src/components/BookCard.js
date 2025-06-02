import React from 'react';
import './BookCard.css'; // Make sure this is imported

function BookCard({ book, onDelete, onEdit }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p><strong>Author:</strong> {book.author}</p>
      <p><strong>Status:</strong> {book.status}</p>
      {book.rating && <p><strong>Rating:</strong> ⭐ {book.rating}/5</p>}
      {book.review && <p><strong>Review:</strong> {book.review}</p>}

      <div className="actions"> {/* Added actions div */}
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book.id)} className="delete-btn">Delete</button> {/* Added delete-btn class */}
      </div>
    </div>
  );
}

export default BookCard;