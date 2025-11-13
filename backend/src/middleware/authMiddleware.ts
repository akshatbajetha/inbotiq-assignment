import { Request, Response, NextFunction } from 'express';
import { env } from '../config/env';
import { verifyToken } from '../utils/jwt';
import { findUserById } from '../services/auth.service';
import { AppError } from '../utils/AppError';

// Authentication middleware
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies[env?.COOKIE_NAME || 'auth_token'];

    if (!token) {
      throw new AppError(401, 'Authentication required. Please log in.');
    }

    // Verify token
    const decoded = verifyToken(token);

    // Optionally verify user still exists in database
    const user = await findUserById(decoded.userId);

    // Attach user info to request object
    req.user = {
      ...decoded,
      id: user.id,
      name: user.name,
      email: user.email,
    };

    next();
  } catch (error) {
    // If token is invalid or expired, clear the cookie
    res.clearCookie(env?.COOKIE_NAME || 'auth_token', {
      httpOnly: true,
      secure: env?.NODE_ENV === 'production' || false,
      sameSite: 'strict',
      path: '/',
    });

    if (error instanceof AppError) {
      next(error);
    } else {
      next(new AppError(401, 'Authentication failed'));
    }
  }
};

