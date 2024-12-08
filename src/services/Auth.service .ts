import { jwtConfig } from '../config/Jwt.config';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/User.repository';
import { User } from '../entities/User.entity';
import { CreateUserDTO } from '../dto/User.dto';
import { AppError } from '../middlewares/GlobalErrorHandler.middleware';

export class AuthService {
  private userRepository: UserRepository

  constructor() {
    this.userRepository = new UserRepository();
  }

  async register(user: CreateUserDTO): Promise<User> {
    const _user = await this.userRepository.findUserByEmail(user.email);
    if (_user) {
      throw new AppError('Email already exits', 400);
    }
    return this.userRepository.create(user);
  }

  async login(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findUserByEmail(username);
    if (!user) {
      throw new AppError('User not found', 400);
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 400);
    }

    const token = jwt.sign({ userId: user.id }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    return token;
  }

  static verifyToken(token: string): any {
    try {
      return jwt.verify(token, jwtConfig.secret);
    } catch (error) {
      throw new AppError('Invalid or expired token', 500);
    }
  }
}