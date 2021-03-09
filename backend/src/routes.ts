import express from 'express';

import middleware from './middlewares/auth';

import UserController from './controllers/UserController';
import SessionController from './controllers/SessionController';
import TravelController from './controllers/TravelController';
import PaymentController from './controllers/PaymentController';
import DestinationController from './controllers/DestinationController';

const routes = express.Router();

const sessionController = new SessionController();
const userControllers = new UserController();
const travelController = new TravelController();
const paymentController = new PaymentController();
const destinationController = new DestinationController();

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

routes.get('/payment/validate', paymentController.validate);
routes.post('/payment', paymentController.create);

routes.get('/destiny', destinationController.index);
routes.get('/destiny/:destiny_id', destinationController.show);
routes.post('/destiny', destinationController.create);
routes.put('/destiny/:destiny_id', destinationController.update);
routes.delete('/destiny/:destiny_id', destinationController.delete);

export default routes;
