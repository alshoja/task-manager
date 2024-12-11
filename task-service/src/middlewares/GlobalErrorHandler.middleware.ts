import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }
}

export const globalErrorMiddleware = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        message,
        error: {
            code: statusCode,
            details: err.details || err.message || "An unexpected error occurred",
        },
    });
};