import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Navbar.css';

const Navbar = () => {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="brand">📖 Book Tracker</Link> {/* Changed className to brand */}

      <div className="nav-links">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
        <button onClick={() => setDarkMode(prev => !prev)} className="theme-toggle">
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;