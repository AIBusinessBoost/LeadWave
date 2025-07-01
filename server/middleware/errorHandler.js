export function errorHandler(err, req, res, next) {
  console.error('Error:', err);

  // Default error
  let error = {
    message: err.message || 'Internal Server Error',
    status: err.status || 500
  };

  // Rate limiting error
  if (err.name === 'RateLimitError') {
    error = {
      message: 'Too many requests. Please try again later.',
      status: 429
    };
  }

  // Validation error
  if (err.name === 'ValidationError') {
    error = {
      message: 'Invalid request data',
      status: 400,
      details: err.details
    };
  }

  res.status(error.status).json({
    error: error.message,
    ...(error.details && { details: error.details })
  });
}
