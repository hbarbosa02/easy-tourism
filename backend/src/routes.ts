import express from 'express';

import middleware from './middlewares/auth';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TravelController from './controllers/TravelController';

const routes = express.Router();

const sessionController = new SessionController();
const userControllers = new UserController();
const travelController = new TravelController();

routes.post('/login', sessionController.create);
routes.post('/forgot', sessionController.update);
routes.post('/signup', userControllers.create);

routes.use(middleware);

routes.get('/user', userControllers.show);
routes.get('/user/list', userControllers.index);

routes.get('/travel', travelController.index);
routes.get('/travel/:travel_id', travelController.show);
routes.post('/travel', travelController.create);
routes.put('/travel/:travel_id', travelController.update);
routes.delete('/travel/:travel_id', travelController.delete);

export default routes;
