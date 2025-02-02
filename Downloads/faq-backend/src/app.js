const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const faqRoutes = require('./routes/faqRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', faqRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

module.exports = app;