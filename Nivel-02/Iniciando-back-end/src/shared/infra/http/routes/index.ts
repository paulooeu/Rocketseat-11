import { Router } from 'express';
import agendamentoRoutes from '@modules/agendamentos/infra/http/routes/agendamentos.routes';
import usuarioRoutes from '@modules/usuarios/infra/http/routes/usuario.routes';
import sessaoRoutes from '@modules/usuarios/infra/http/routes/sessao.routes';

const routes = Router();

routes.use('/login', sessaoRoutes);
routes.use('/agendamentos', agendamentoRoutes);
routes.use('/usuarios', usuarioRoutes);

export default routes;
