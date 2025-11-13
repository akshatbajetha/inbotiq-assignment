import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from './AppError';

export interface JWTPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}

// Signs a JWT token with user payload
export const signToken = (
  payload: JWTPayload,
  expiresIn?: string
): string => {
  const tokenExpiry = expiresIn || env.JWT_EXPIRES_IN;
  return jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: tokenExpiry,
  } as jwt.SignOptions);
};

// Verifies and decodes a JWT token
export const verifyToken = (token: string): JWTPayload => {
  try {
    const decoded = jwt.verify(token, env.JWT_SECRET) as JWTPayload;
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new AppError(401, 'Token has expired');
    }
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AppError(401, 'Invalid token');
    }
    throw new AppError(401, 'Token verification failed');
  }
};

