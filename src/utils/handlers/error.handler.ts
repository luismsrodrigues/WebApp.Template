import { Response, Request, NextFunction } from "express";

export function ErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {
    response.status(400).json({
        Error: error.message
    });
}