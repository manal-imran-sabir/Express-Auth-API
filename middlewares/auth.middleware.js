const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.config');
const apiResponse = require('../utils/apiResponse');

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return apiResponse.unauthorized(res, 'Authorization header missing');
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return apiResponse.unauthorized(res, 'Token missing');
  }

  jwt.verify(token, authConfig.jwt.secret, (err, user) => {
    if (err) {
      return apiResponse.forbidden(res, 'Invalid or expired token');
    }
    req.user = user;
    next();
  });
}

function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return apiResponse.forbidden(res, 'You do not have permission to perform this action');
    }
    next();
  };
}

module.exports = {
  authenticateJWT,
  authorizeRoles
};
