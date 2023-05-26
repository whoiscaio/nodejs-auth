import { Router } from 'express';
import UserController from '../controllers/UserController';

const appRouter = Router();

appRouter.get('/users', UserController.index);

export default appRouter;
