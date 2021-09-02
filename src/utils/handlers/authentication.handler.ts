import { Response, Request, NextFunction } from "express";

export function AuthorizeHandler( request: Request, response: Response, next: NextFunction){
    response.status(401).json({
        error: new Error('Invalid request!')
    });
}