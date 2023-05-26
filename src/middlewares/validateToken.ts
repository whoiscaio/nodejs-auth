import { NextFunction, Request, Response } from 'express';

function validateToken(request: Request, response: Response, next: NextFunction) {
  next();
}

export default validateToken;