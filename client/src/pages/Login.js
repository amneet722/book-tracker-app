// client/src/pages/Login.js
import React, { useState, useContext } from 'react';
import axios from '../api';
import { useNavigate, Link } from 'react-router-dom';
import { ThemeContext } from '../App'; // Import ThemeContext if needed for specific logic (not styling here)
import './Auth.css'; // Make sure Auth.css is imported

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // You can use ThemeContext here if needed for login form specific dark mode adjustments
  // const { darkMode } = useContext(ThemeContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err.response ? err.response.data : err.message);
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="main-content"> {/* Ensure main-content wrapper is still here from App.js */}
      <div className="auth-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          {error && <p className="error-message">{error}</p>}

          <div className="auth-form-group"> {/* Added for consistent spacing */}
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email" /* Added for autocomplete */
            />
          </div>

          <div className="auth-form-group"> {/* Added for consistent spacing */}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password" /* Added for autocomplete */
            />
          </div>

          <button type="submit" className="auth-submit-btn">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;