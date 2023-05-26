import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export type User = {
  username: string,
  password: string
}

const users: User[] = [];

class AuthController {
  async login(request: Request, response: Response) {
    const { username, password } = request.body;

    const user = users.find((user) => user.username === username);

    if (!user) {
      return response.status(404).json({ message: `User ${username} does not exist.` });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
          throw new Error('500Environment issue, try again later.');
        }

        const accessToken = jwt.sign(user, jwtSecret, { expiresIn: '15m' });

        response.status(200).json({
          username,
          accessToken
        });
      } else {
        throw new Error('Incorrect password.')
      }
    } catch (err: any)  {
      const statusCode = String(err.message).includes('500') ? 500 : 400;
      const message = String(err.message).includes('500') ? err.message.split('500')[1] : err.message;

      return response.status(statusCode).json({ message });
    }
  }

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
}

export default new AuthController();
