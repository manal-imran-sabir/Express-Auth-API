function success(res, data = {}, message = 'Success') {
  return res.status(200).json({
    success: true,
    message,
    data
  });
}

function created(res, data = {}, message = 'Resource created') {
  return res.status(201).json({
    success: true,
    message,
    data
  });
}

function badRequest(res, message = 'Bad request') {
  return res.status(400).json({
    success: false,
    message
  });
}

function unauthorized(res, message = 'Unauthorized') {
  return res.status(401).json({
    success: false,
    message
  });
}

function forbidden(res, message = 'Forbidden') {
  return res.status(403).json({
    success: false,
    message
  });
}

function notFound(res, message = 'Resource not found') {
  return res.status(404).json({
    success: false,
    message
  });
}

function error(res, message = 'Internal server error') {
  return res.status(500).json({
    success: false,
    message
  });
}

module.exports = {
  success,
  created,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  error
};
