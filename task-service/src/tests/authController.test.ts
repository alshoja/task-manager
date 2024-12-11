import { AuthController } from '../controllers/Auth.controller';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/Auth.service ';
import { UserRepository } from '../repositories/User.repository';

let mockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;

describe('AuthController', () => {
  let authService: AuthService;
  let authController: AuthController;
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  jest.mock('../config/Db.config.ts', () => ({
    AppDataSource: {
      initialize: jest.fn(),
      destroy: jest.fn(),
      isInitialized: true,
      getRepository: jest.fn().mockReturnValue({
        findOne: jest.fn(),
        save: jest.fn(),
      }),
    },
  }));

  beforeEach(() => {
    const userRepository = new mockUserRepository()
    authService = new AuthService(userRepository);
    authController = new AuthController(authService);
    req = {
      body: {},
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  describe('register', () => {
    it('should register a user and return a success message', async () => {
      const mockUser = { id: 1, username: 'testUser', email: 'test@example.com' };
      authService.register = jest.fn().mockResolvedValue(mockUser);

      req.body = { username: 'testUser', email: 'test@example.com', password: 'password123' };

      await authController.register(req as Request, res as Response, next);

      expect(authService.register).toHaveBeenCalledWith({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'User registered successfully',
        user: mockUser,
      });
    });

    it('should handle errors and call next', async () => {
      const mockError = new Error('Registration failed');
      authService.register = jest.fn().mockRejectedValue(mockError);

      req.body = { username: 'testUser', email: 'test@example.com', password: 'password123' };

      await authController.register(req as Request, res as Response, next);

      expect(authService.register).toHaveBeenCalledWith({
        username: 'testUser',
        email: 'test@example.com',
        password: 'password123',
      });
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });

  describe('login', () => {
    it('should log in a user and return a token', async () => {
      const mockToken = 'mock-jwt-token';
      authService.login = jest.fn().mockResolvedValue(mockToken);

      req.body = { username: 'testUser', password: 'password123' };

      await authController.login(req as Request, res as Response, next);

      expect(authService.login).toHaveBeenCalledWith('testUser', 'password123');
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Login successful',
        token: mockToken,
      });
    });

    it('should handle errors and call next', async () => {
      const mockError = new Error('Login failed');
      authService.login = jest.fn().mockRejectedValue(mockError);

      req.body = { username: 'testUser', password: 'password123' };

      await authController.login(req as Request, res as Response, next);

      expect(authService.login).toHaveBeenCalledWith('testUser', 'password123');
      expect(next).toHaveBeenCalledWith(mockError);
    });
  });
});
