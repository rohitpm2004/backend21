export const errorHandler = (err, req, res, next) => {
  console.error('[Error Middleware]:', err.stack || err.message);
  const status = err.statusCode || 500;
  res.status(status).json({
    error: err.message || 'Internal Server Error'
  });
};
