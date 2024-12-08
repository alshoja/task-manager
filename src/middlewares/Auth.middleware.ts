import { Response, Request, NextFunction } from "express";
import { AppError } from "./GlobalErrorHandler.middleware";
import { AuthService } from "../services/Auth.service ";


export class AuthMiddleware {
    static async verifyJwt(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        const authorizationHeader = req.headers['authorization'];
        if (!authorizationHeader) {
            return next(new AppError("No token provided", 401));
        }

        const token = authorizationHeader.split(" ")[1];
        if (!token) {
            return next(new AppError("Malformed token", 401));
        }

        try {
            const decoded = AuthService.verifyToken(token);
            res.locals.user = decoded;
            next();
        } catch (error) {
            next(new AppError("Invalid or expired token", 401));
        }
    }
}
