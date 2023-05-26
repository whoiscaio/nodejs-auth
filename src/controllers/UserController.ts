import { Request, Response } from 'express';
import users from '../mocks/users';

class UserController {
  index(request: Request, response: Response) {
    response.json(users);
  }
}

export default new UserController();
