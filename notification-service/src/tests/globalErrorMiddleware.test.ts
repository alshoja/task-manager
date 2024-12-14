import { Request, Response, NextFunction } from "express";
import { globalErrorMiddleware, AppError } from "../middlewares/GlobalErrorHandler.middleware";

describe("Global Error Middleware", () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    test("should handle AppError and return correct JSON response", () => {
        const error = new AppError("Test error message", 400);

        globalErrorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(400);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Test error message",
            error: {
                code: 400,
                details: "Test error message",
            },
        });
    });

    test("should handle generic error and return 500 Internal Server Error", () => {
        const error = new Error("Unexpected error");

        globalErrorMiddleware(
            error,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Unexpected error",
            error: {
                code: 500,
                details: "Unexpected error",
            },
        });
    });

    test("should handle error without message and return 500 Internal Server Error", () => {
        const error = {};

        globalErrorMiddleware(
            error as any,
            mockRequest as Request,
            mockResponse as Response,
            mockNext
        );

        expect(mockResponse.status).toHaveBeenCalledWith(500);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: "Internal Server Error",
            error: {
                code: 500,
                details: "An unexpected error occurred",
            },
        });
    });
});
