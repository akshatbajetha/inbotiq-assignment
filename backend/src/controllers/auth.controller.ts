import { Request, Response, NextFunction } from 'express';
import { signupSchema, loginSchema } from '../validators/authSchemas';
import { createUser, validateUser } from '../services/auth.service';
import { signToken } from '../utils/jwt';
import { setAuthCookie, clearAuthCookie } from '../utils/cookies';
import { asyncHandler } from '../middleware/errorHandler';

// Signup controller
export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validate request body with Zod
    const validationResult = signupSchema.safeParse(req.body);

    if (!validationResult.success) {
      return next(validationResult.error);
    }

    const { name, email, password, role } = validationResult.data;

    // Create user
    const user = await createUser({ name, email, password, role });

    // Generate JWT token
    const token = signToken({ userId: user.id, role: user.role });

    setAuthCookie(res, token);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user,
    });
  }
);

// Login controller
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // Validate request body with Zod
    const validationResult = loginSchema.safeParse(req.body);

    if (!validationResult.success) {
      return next(validationResult.error);
    }

    const { email, password } = validationResult.data;

    // Validate user credentials
    const user = await validateUser(email, password);

    // Generate JWT token
    const token = signToken({ userId: user.id, role: user.role });

    setAuthCookie(res, token);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      user,
    });
  }
);

// Get current user controller
export const me = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    // User is already attached to req by authMiddleware
    if (!req.user) {
      return next(new Error('User not found in request'));
    }

    res.status(200).json({
      success: true,
      user: {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  }
);

// Logout controller
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {

    clearAuthCookie(res);

    res.status(200).json({
      success: true,
      message: 'Logout successful',
    });
  }
);

