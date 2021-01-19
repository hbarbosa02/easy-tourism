import express from 'express';

import middleware from './middlewares/auth';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const routes = express.Router();

const sessionController = new SessionController();
const userControllers = new UserController();

routes.post('/login', sessionController.create);
routes.post('/forgot', sessionController.update);
routes.post('/signup', userControllers.create);

routes.use(middleware);

routes.get('/user/index', userControllers.index);
routes.get('/user/list', userControllers.list);

export default routes;
