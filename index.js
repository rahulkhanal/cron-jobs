// server.js
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User');
const Subscription = require('./models/Subscription');
const { registerUser } = require('./controllers/registerUser');

const app = express();
const PORT = 3344;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Stock Notification System');
});
app.post('/register', registerUser)

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});