import express from 'express';

import ClassesController from './controllers/UserController';
import SessionController from './controllers/SessionController';

const routes = express.Router();

const sessionController = new SessionController();
const classesControllers = new ClassesController();

routes.post('/login', sessionController.create);
routes.post('/signup', classesControllers.create);

export default routes;
