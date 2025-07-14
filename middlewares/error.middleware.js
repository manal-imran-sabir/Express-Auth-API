const apiResponse = require('../utils/apiResponse');

function errorHandler(err, req, res, next) {
  console.error(err.stack);
  
  if (err.name === 'ValidationError') {
    return apiResponse.badRequest(res, err.message);
  }
  
  if (err.name === 'UnauthorizedError') {
    return apiResponse.unauthorized(res, err.message);
  }
  
  apiResponse.error(res, err.message);
}

module.exports = {
  errorHandler
};
