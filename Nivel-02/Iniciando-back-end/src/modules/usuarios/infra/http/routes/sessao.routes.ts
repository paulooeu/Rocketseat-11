import { Router } from 'express';
import SessionController from '../controllers/SessionController'

const usuairosRouter = Router();
const sessionController = new SessionController()

usuairosRouter.post('/', sessionController.create);

export default usuairosRouter;
