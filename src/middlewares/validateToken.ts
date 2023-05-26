import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../controllers/AuthController';

function validateToken(request: Request, response: Response, next: NextFunction) {
  const jwtSecret = process.env.JWT_SECRET;

  if (!jwtSecret) {
    return response.status(500).json({ message: 'Environment issue, try again later.' });
  }

  const authHeader = request.headers['authorization'];
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return response.status(401).json({ message: 'Unauthorized access.' });
  }

  jwt.verify(accessToken, jwtSecret, (error, user) => {
    if (error) {
      return response.status(403).json({ message: 'Invalid or expired access.' });
    }

    request.user = user as User;
    next();
  });
}

export default validateToken;