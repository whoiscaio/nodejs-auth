import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import validateAuthFields from '../middlewares/validateAuthFields';

const authRouter = Router();

authRouter.post('/login', validateAuthFields, AuthController.login);
authRouter.post('/signup', validateAuthFields, AuthController.signup);

export default authRouter;
