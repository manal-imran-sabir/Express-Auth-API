const authService = require('../services/auth.service');
const apiResponse = require('../utils/apiResponse');

async function register(req, res, next) {
  try {
    const { username, email, password } = req.body;
    const user = await authService.register({ username, email, password });
    apiResponse.success(res, { user }, 'User registered successfully');
  } catch (error) {
    next(error);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    apiResponse.success(res, result, 'Login successful');
  } catch (error) {
    next(error);
  }
}

module.exports = {
  register,
  login
};
