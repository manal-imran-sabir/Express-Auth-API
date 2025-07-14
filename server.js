require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Database connection
const { sequelize, testConnection } = require('./config/db.config');
testConnection();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Error handling middleware
const { errorHandler } = require('./middlewares/error.middleware');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
