import { Response, Request, NextFunction } from "express";
import { ValidationError, LogicError, UnauthorizedError } from '@/lib/entities';

export function ErrorHandler(error: Error, request: Request, response: Response, next: NextFunction) {

    console.log(error);

    if (error instanceof ValidationError) {
        response.status(error.HTTP_STATUS_CODE).json({
            Title: error.message,
            Values: error.Values
        });

        return;
    } else if (error instanceof LogicError) {
        response.status(error.HTTP_STATUS_CODE).json({
            Title: error.message
        });

        return;
    } else if (error instanceof UnauthorizedError) {
        response.status(error.HTTP_STATUS_CODE).json({
            Title: error.message
        });

        return;
    }

    response.status(500).json({
        Title: "Ocorreu algum erro desconhecido. Contacte a equipa de suporte."
    });
}