const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const { query, connectDB } = require('./db'); // Use destructured query and connectDB

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to DB immediately on server start
connectDB(); // Call the connectDB function

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/books', bookRoutes);

// Test route (optional)
app.get('/', async (req, res) => {
  try {
    const result = await query('SELECT NOW()');
    res.send(`📚 Book Tracker API Running. DB Time: ${result.rows[0].now}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('❌ Database connection failed');
  }
});

// Global Error Handler (Good practice for unhandled errors)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});