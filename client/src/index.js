import React from 'react';
import ReactDOM from 'react-dom/client'; // Correct import for React 18+
import App from './App';
import './app.css'; // Assuming you want global styles loaded here

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);