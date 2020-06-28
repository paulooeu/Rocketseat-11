import { Router } from 'express';

import garantirAutenticacao from '@modules/usuarios/infra/middleware/garantirAutenticacao';
import AgendamentoController from '../controllers/AgendamentoController'

const agendamentosRoutes = Router();
const agendamentoController = new AgendamentoController()

agendamentosRoutes.use(garantirAutenticacao);

agendamentosRoutes.post('/',agendamentoController.create);

export default agendamentosRoutes;
