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
        const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

        if (!jwtSecret || !jwtRefreshSecret) {
          throw new Error('500Environment issue, try again later.');
        }

        const accessToken = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '30s' });
        const refreshToken = jwt.sign({ username: user.username }, jwtRefreshSecret, { expiresIn: '30d' });

        response.status(200).json({
          username,
          accessToken,
          refreshToken
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
      response.status(500).json({ message: 'Some error ocurred, please try again later.' });
    }
  }

  refresh(request: Request, response: Response) {
    const jwtSecret = process.env.JWT_SECRET;
    const jwtRefreshSecret = process.env.JWT_REFRESH_SECRET;

    if (!jwtSecret || !jwtRefreshSecret) {
      return response.status(500).json({ message: 'Environment issue, try again later.' });
    }

    const { refreshToken } = request.body;

    if (!refreshToken) {
      return response.status(400).json({ message: 'Refresh token is required.' });
    }

    jwt.verify(String(refreshToken), jwtRefreshSecret, (err, user) => {
      if(err) {
        return response.status(400).json({ message: 'Invalid or expired refresh token.' });
      }

      const currentUser = user as User;

      const accessToken = jwt.sign({ username: currentUser.username }, jwtSecret, { expiresIn: '30s' });

      return response.json({ accessToken: accessToken });
    })
  }
}

export default new AuthController();
