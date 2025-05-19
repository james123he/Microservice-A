/* Microservice A: Progress Logger */

// Dependencies
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const jwt = require('jsonwebtoken'); // placeholder for auth
const retry = require('async-retry');

// Initialize
const app = express();
app.use(express.json());
app.use(morgan('combined')); // logging

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/progressdb';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Schema & Model
const progressSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  choreId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  timestamp: { type: Date, default: Date.now }
}, { timestamps: true });

const Progress = mongoose.model('Progress', progressSchema);

// Auth middleware
function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });
  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// POST /logProgress
app.post('/logProgress', authenticate, async (req, res) => {
  const { userId, choreId, status } = req.body;
  if (!userId || !choreId || !status) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await retry(async () => {
      await Progress.create({ userId, choreId, status });
    }, { retries: 3, minTimeout: 100 });

    return res.json({ message: 'Progress logged successfully' });
  } catch (err) {
    console.error('Error logging progress:', err);
    return res.status(500).json({ error: 'Failed to log progress' });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Microservice A running on port ${PORT}`));
