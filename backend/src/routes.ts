import express from 'express';

import ClassesController from './controllers/UserController';

const routes = express.Router();
const classesControllers = new ClassesController();

routes.post('/create', classesControllers.create);

export default routes;
