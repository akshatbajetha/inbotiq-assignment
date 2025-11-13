import { Router } from 'express';
import { signup, login, me, logout } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

// Signup route
router.post('/signup', signup);

// Login route
router.post('/login', login);

// Get current user route
router.get('/me', authMiddleware, me);

// Logout route
router.post('/logout', authMiddleware, logout);

export default router;

