import { Router } from 'express';
import UserController from '../controllers/UserController';
import validateToken from '../middlewares/validateToken';

const appRouter = Router();

appRouter.get('/users', validateToken, UserController.index);

export default appRouter;
