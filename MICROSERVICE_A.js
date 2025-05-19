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



// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Microservice A running on port ${PORT}`));
