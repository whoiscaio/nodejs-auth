import { NextFunction, Request, Response } from 'express';

function validateAuthFields(request: Request, response: Response, next: NextFunction) {
  const { username, password } = request.body;

    if (!username) {
      return response.status(400).json({ message: 'Field username is required.' });
    }

    if (!password) {
      return response.status(400).json({ message: 'Field username is required.' });
    }

    next();
}

export default validateAuthFields;
