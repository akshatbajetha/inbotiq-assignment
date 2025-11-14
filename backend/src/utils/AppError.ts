export class AppError extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(statusCode: number, message: string, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    // Capture stack trace if available (Node.js)
    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, AppError);
    }

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, AppError.prototype);
  }
}

