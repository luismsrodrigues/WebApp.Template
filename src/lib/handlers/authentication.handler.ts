import { Response, Request, NextFunction } from "express";
import { UnauthorizedError } from '@/lib/entities';

//TODO : ADD LOGIC FOR VALIDATION OF USER 
export function AuthorizeHandler(request: Request, response: Response, next: NextFunction) {
    throw new UnauthorizedError("Unauthorized");
}