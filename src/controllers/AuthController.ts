import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

type User = {
  username: string,
  password: string
}

const users: User[] = [];

class AuthController {
  login() {}

  async signup(request: Request, response: Response) {
    const { username, password } = request.body;

    try {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      users.push({
        username,
        password: hashedPassword
      });

      response.status(201).json(users);
    } catch {
      response.status(500).json({ message: 'Algum erro aconteceu durante o cadastro, tente mais tarde.' });
    }
  }

  getAccessToken() {}
}

export default new AuthController();
