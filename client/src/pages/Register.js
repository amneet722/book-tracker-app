// client/src/pages/Register.js
import React, { useState, useContext } from 'react';
import axios from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../App'; // Import ThemeContext
import './Auth.css'; // Make sure Auth.css is imported

function Register() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const { darkMode } = useContext(ThemeContext); // Use if needed

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('/auth/register', { name, username, email, password });
      navigate('/login');
      alert('Registration successful! Please log in.');
    } catch (err) {
      console.error('Registration error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="main-content"> {/* Ensure main-content wrapper is still here from App.js */}
      <div className="auth-container">
        <h2>Register</h2>
        <form onSubmit={handleRegister}>
          {error && <p className="error-message">{error}</p>}

          <div className="auth-form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name" /* Added for autocomplete */
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username" /* Added for autocomplete */
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email" /* Added for autocomplete */
            />
          </div>

          <div className="auth-form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Choose a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password" /* Added for autocomplete */
            />
          </div>

          <button type="submit" className="auth-submit-btn">Register</button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;