import { NextFunction, Request, Response } from "express";
import { AuthService } from "../services/Auth.service ";

const authService = new AuthService();

export class AuthController {
    static async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, email, password } = req.body;
        try {
            const user = await authService.register({ username, email, password });
            res.status(201).json({ message: 'User registered successfully', user });
        } catch (error) {
            next(error);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        const { username, password } = req.body;
        try {
            const token = await authService.login(username, password);
            res.status(200).json({ message: 'Login successful', token });
        } catch (error) {
            next(error);
        }
    }
}


