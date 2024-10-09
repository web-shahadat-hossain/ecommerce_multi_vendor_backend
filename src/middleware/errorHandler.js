// Not Found Error handler
export const notFoundErrorHandler = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`); // Corrected req.originalURL to req.originalUrl
  res.status(404);
  next(error);
};

// General error handler
export const errorHandler = (err, req, res, next) => {
  // Default statusCode to 500 if not explicitly set
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    status: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "" : err.stack,
  });
};

// Custom AppError class for specific error handling
export class AppError extends Error {
  constructor(message, statusCode = 500) {
    // Added default statusCode
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    Error.captureStackTrace(this, this.constructor);
  }
}
