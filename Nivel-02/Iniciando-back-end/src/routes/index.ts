import { Router } from 'express';
import agendamentoRoutes from './agendamentos.routes';
import usuarioRoutes from './usuario.routes';
import sessaoRoutes from './sessao.routes';

const routes = Router();

routes.use('/login', sessaoRoutes);
routes.use('/agendamentos', agendamentoRoutes);
routes.use('/usuarios', usuarioRoutes);

export default routes;
