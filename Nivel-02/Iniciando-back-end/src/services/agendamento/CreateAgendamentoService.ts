import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Agendamento from '../../models/Agendamento';
import AgendamentoRepository from '../../repositories/AgendamentoRepository';
import AppError from '../../errors/AppError';

interface Request {
  barbeiro_id: string;
  data: Date;
}

class CreateAgendamentoService {
  public async execute({ data, barbeiro_id }: Request): Promise<Agendamento> {
    const agendamentoRepository = getCustomRepository(AgendamentoRepository);
    const agendamentoData = startOfHour(data);

    const buscarAgendamento = await agendamentoRepository.buscarData(
      agendamentoData,
    );
    if (buscarAgendamento) {
      throw new AppError('Já existe agendamento nesse horario.');
    }

    const agendamento = agendamentoRepository.create({
      barbeiro_id,
      data: agendamentoData,
    });
    await agendamentoRepository.save(agendamento);
    return agendamento;
  }
}
export default CreateAgendamentoService;
