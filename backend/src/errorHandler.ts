import { NextFunction, Request, Response } from 'express'

export function handleUndefinedRoutes(req: Request, res: Response, next: NextFunction) {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export function handleErrors(err: Error, req: Request, res: Response, next: NextFunction) {
    const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
}