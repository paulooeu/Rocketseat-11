import { Router } from 'express';
import { parseISO } from 'date-fns';
import AgendamentoRepository from '../repositories/AgendamentoRepository';
import CreateAgendamentoService from '../services/agendamento/CreateAgendamentoService';

const agendamentosRoutes = Router();
const agendamentoRepository = new AgendamentoRepository();

agendamentosRoutes.get('/', (request, response) => {
  const agendamentoList = agendamentoRepository.all();
  return response.json(agendamentoList);
});

agendamentosRoutes.post('/', (request, response) => {
  try {
    const { barbeiro, data } = request.body;
    const parsedDate = parseISO(data);

    const createAgendamentoService = new CreateAgendamentoService(
      agendamentoRepository,
    );
    const agendamento = createAgendamentoService.execute({
      barbeiro,
      data: parsedDate,
    });
    return response.json(agendamento);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default agendamentosRoutes;
