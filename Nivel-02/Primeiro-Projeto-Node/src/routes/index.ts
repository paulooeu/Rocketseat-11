import { Router } from 'express';
import agendamentoRoutes from './agendamentos.routes';

const routes = Router();

routes.use('/agendamentos', agendamentoRoutes);

export default routes;
