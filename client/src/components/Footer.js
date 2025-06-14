import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../App';
import './Footer.css';

function Footer() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <footer className={`app-footer ${darkMode ? 'dark' : ''}`}>
      <div className="footer-content">
        <div className="footer-section brand-info">
          <h3>Book Tracker App</h3>
          <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        </div>

        <div className="footer-section nav-links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </ul>
        </div>

        <div className="footer-section legal-links">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
            <li><Link to="/terms-of-service">Terms of Service</Link></li>
          </ul>
        </div>

        <div className="footer-section social-links">
          <h4>Connect</h4>
          <div className="social-icons">
            
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>Made with ❤️ for book lovers.</p>
      </div>
    </footer>
  );
}

export default Footer;