const jwt = require('jsonwebtoken');
const { User } = require('../models');
const authConfig = require('../config/auth.config');

async function register({ username, email, password }) {
  // Check if user already exists
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Create new user
  const user = await User.create({ username, email, password });
  return sanitizeUser(user);
}

async function login(email, password) {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error('User not found');
  }

  const isValidPassword = await user.validPassword(password);
  if (!isValidPassword) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    authConfig.jwt.secret,
    { expiresIn: authConfig.jwt.expiresIn }
  );

  return {
    user: sanitizeUser(user),
    token
  };
}

function sanitizeUser(user) {
  const values = user.get();
  delete values.password;
  return values;
}

module.exports = {
  register,
  login
};
