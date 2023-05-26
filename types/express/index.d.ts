import { User } from '../../src/controllers/AuthController';

declare global {
  namespace Express {
    interface Request {
      user: User
    }
  }
}