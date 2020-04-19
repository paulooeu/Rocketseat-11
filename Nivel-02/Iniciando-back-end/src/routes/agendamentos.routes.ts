import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AgendamentoRepository from '../repositories/AgendamentoRepository';
import CreateAgendamentoService from '../services/agendamento/CreateAgendamentoService';

const agendamentosRoutes = Router();

agendamentosRoutes.get('/', async (request, response) => {
  const agendamentoRepository = getCustomRepository(AgendamentoRepository);
  const agendamentoList = await agendamentoRepository.find();
  return response.json(agendamentoList);
});

agendamentosRoutes.post('/', async (request, response) => {
  try {
    const { barbeiro_id, data } = request.body;
    const parsedDate = parseISO(data);

    const createAgendamentoService = new CreateAgendamentoService();
    const agendamento = await createAgendamentoService.execute({
      barbeiro_id,
      data: parsedDate,
    });
    return response.json(agendamento);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default agendamentosRoutes;
