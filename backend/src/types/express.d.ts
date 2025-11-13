import { JWTPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload & {
        id: string;
        name: string;
        email: string;
      };
    }
  }
}

