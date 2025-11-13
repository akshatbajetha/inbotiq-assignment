import { Response } from 'express';
import ms from 'ms';
import { env } from '../config/env';

// Sets the authentication cookie with JWT token
export const setAuthCookie = (res: Response, token: string): void => {
  const isProduction = env.NODE_ENV === 'production';
  const maxAge = ms(env.JWT_EXPIRES_IN as ms.StringValue);

  res.cookie(env.COOKIE_NAME, token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: 'strict',
    maxAge: maxAge,
    path: '/',
    ...(env.COOKIE_DOMAIN && { domain: env.COOKIE_DOMAIN }),
  });
};

// Clears the authentication cookie
export const clearAuthCookie = (res: Response): void => {
  res.clearCookie(env.COOKIE_NAME, {
    httpOnly: true,
    secure: env.NODE_ENV === 'production' || false,
    sameSite: 'strict',
    path: '/',
    ...(env.COOKIE_DOMAIN && { domain: env.COOKIE_DOMAIN }),
  });
};

