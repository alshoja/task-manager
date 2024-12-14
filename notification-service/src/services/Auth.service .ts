import { jwtConfig } from '../config/Jwt.config';
import jwt from 'jsonwebtoken';
import { AppError } from '../middlewares/GlobalErrorHandler.middleware';

export class AuthService {

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new AppError('Invalid or expired token', 500);
    }
  }
}