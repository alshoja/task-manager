import { UserRepository } from '../repositories/User.repository';
import { User } from '../entities/User.entity';
import { AppError } from '../middlewares/GlobalErrorHandler.middleware';
import jwt from 'jsonwebtoken';
import { AuthService } from '../services/Auth.service ';
import { AppDataSource } from '../config/Db.config';

jest.mock('../repositories/User.repository');
jest.mock('jsonwebtoken');

const mockUserRepository = UserRepository as jest.MockedClass<typeof UserRepository>;
const mockJwt = jwt as jest.Mocked<typeof jwt>;

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

describe('AuthService', () => {
    let authService: AuthService;

    afterAll(async () => {
        jest.spyOn(console, 'log').mockImplementation(() => {});
        if (AppDataSource.isInitialized) {
            await AppDataSource.destroy();
        }
    });

    beforeEach(() => {
        authService = new AuthService();
        mockUserRepository.prototype.findUserByEmail.mockClear();
        mockUserRepository.prototype.create.mockClear();
        mockJwt.sign.mockClear();
        mockJwt.verify.mockClear();
        jest.restoreAllMocks();
    });

    describe('register', () => {
        it('should register a new user if email is unique', async () => {
            const mockUser: any = { email: 'test@example.com', password: 'password123' };

            mockUserRepository.prototype.findUserByEmail.mockResolvedValue(null);
            mockUserRepository.prototype.create.mockResolvedValue(mockUser);

            const result = await authService.register(mockUser);

            expect(mockUserRepository.prototype.findUserByEmail).toHaveBeenCalledWith('test@example.com');
            expect(mockUserRepository.prototype.create).toHaveBeenCalledWith(mockUser);
            expect(result).toEqual(mockUser);
        });

        it('should throw an error if email already exists', async () => {
            const mockUser: any = { email: 'test@example.com', password: 'password123' };

            mockUserRepository.prototype.findUserByEmail.mockResolvedValue(mockUser);

            await expect(authService.register(mockUser)).rejects.toThrow(AppError);
            expect(mockUserRepository.prototype.findUserByEmail).toHaveBeenCalledWith('test@example.com');
        });
    });

    describe('login', () => {
        it('should return a token for valid credentials', async () => {
            const mockUser = {
                id: 1,
                email: 'test@example.com',
                comparePassword: jest.fn().mockResolvedValue(true),
            } as unknown as User;

            const mockToken = 'mockToken';

            mockUserRepository.prototype.findUserByEmail.mockResolvedValue(mockUser);
            (mockJwt.sign as jest.Mock).mockReturnValue(mockToken);

            const result = await authService.login('test@example.com', 'password123');

            expect(mockUserRepository.prototype.findUserByEmail).toHaveBeenCalledWith('test@example.com');
            expect(mockUser.comparePassword).toHaveBeenCalledWith('password123');
            expect(mockJwt.sign).toHaveBeenCalledWith({ userId: mockUser.id }, expect.any(String), { expiresIn: expect.any(String) });
            expect(result).toEqual(mockToken);
        });

        it('should throw an error if user is not found', async () => {
            mockUserRepository.prototype.findUserByEmail.mockResolvedValue(null);

            await expect(authService.login('test@example.com', 'password123')).rejects.toThrow(AppError);
            expect(mockUserRepository.prototype.findUserByEmail).toHaveBeenCalledWith('test@example.com');
        });

        it('should throw an error for invalid credentials', async () => {
            const mockUser = {
                email: 'test@example.com',
                comparePassword: jest.fn().mockResolvedValue(false),
            } as unknown as User;

            mockUserRepository.prototype.findUserByEmail.mockResolvedValue(mockUser);

            await expect(authService.login('test@example.com', 'wrongPassword')).rejects.toThrow(AppError);
            expect(mockUser.comparePassword).toHaveBeenCalledWith('wrongPassword');
        });
    });

    describe('verifyToken', () => {
        it('should verify a token and return the payload', () => {
            const mockPayload = { userId: 1 };

            (mockJwt.verify as jest.Mock).mockReturnValue(mockPayload);

            const token = 'mockToken';
            const result = AuthService.verifyToken(token);

            expect(mockJwt.verify).toHaveBeenCalledWith(token, expect.any(String));
            expect(result).toEqual(mockPayload);
        });

        it('should throw an error for an invalid token', () => {
            const mockToken = 'invalidToken';

            mockJwt.verify.mockImplementation(() => {
                throw new Error('Invalid token');
            });

            expect(() => AuthService.verifyToken(mockToken)).toThrow(AppError);
            expect(mockJwt.verify).toHaveBeenCalledWith(mockToken, expect.any(String));
        });
    });
});
