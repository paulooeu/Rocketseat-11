import { Router } from 'express';
import agendamentoRoutes from './agendamentos.routes';
import usuarioRoutes from './usuario.routes';

const routes = Router();

routes.use('/agendamentos', agendamentoRoutes);

routes.use('/usuarios', usuarioRoutes);

export default routes;
