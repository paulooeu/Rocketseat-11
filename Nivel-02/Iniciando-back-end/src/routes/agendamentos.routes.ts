import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AgendamentoRepository from '../repositories/AgendamentoRepository';
import CreateAgendamentoService from '../services/agendamento/CreateAgendamentoService';
import garantirAutenticacao from '../middleware/garantirAutenticacao';

const agendamentosRoutes = Router();
agendamentosRoutes.use(garantirAutenticacao);

agendamentosRoutes.get('/', async (request, response) => {
  const agendamentoRepository = getCustomRepository(AgendamentoRepository);
  const agendamentoList = await agendamentoRepository.find();
  return response.json(agendamentoList);
});

agendamentosRoutes.post('/', async (request, response) => {
  const { barbeiro_id, data } = request.body;
  const parsedDate = parseISO(data);

  const createAgendamentoService = new CreateAgendamentoService();
  const agendamento = await createAgendamentoService.execute({
    barbeiro_id,
    data: parsedDate,
  });
  return response.json(agendamento);
});

export default agendamentosRoutes;
