import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './app.css';

export const ThemeContext = createContext(null);

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  useEffect(() => {
    document.body.className = darkMode ? 'dark' : '';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
      <BrowserRouter>
        {/* ADD THIS WRAPPER DIV */}
        <div className="app-container">
          <Navbar />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* THIS IS THE CRITICAL CHANGE: Pass Dashboard as a child to PrivateRoute */}
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              {/* Add placeholder routes for legal pages for now */}
              <Route path="/privacy-policy" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Privacy Policy</h2><p>This is a placeholder for the privacy policy.</p></div>} />
              <Route path="/terms-of-service" element={<div style={{padding: '2rem', textAlign: 'center'}}><h2>Terms of Service</h2><p>This is a placeholder for the terms of service.</p></div>} />
            </Routes>
          </div>
          <Footer />
        </div>
        {/* END WRAPPER DIV */}
      </BrowserRouter>
    </ThemeContext.Provider>
  );
}

export default App;