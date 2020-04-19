import { startOfHour } from 'date-fns';
import Agendamento from '../../models/Agendamento';
import AgendamentoRepository from '../../repositories/AgendamentoRepository';

interface Request {
  barbeiro: string;
  data: Date;
}

class CreateAgendamentoService {
  private agendamentoRepository: AgendamentoRepository;

  constructor(agendamentoRepository: AgendamentoRepository) {
    this.agendamentoRepository = agendamentoRepository;
  }

  public execute({ data, barbeiro }: Request): Agendamento {
    const agendamentoData = startOfHour(data);

    const buscarAgendamento = this.agendamentoRepository.buscarData(
      agendamentoData,
    );
    if (buscarAgendamento) {
      throw Error('Já existe agendamento nesse horario.');
    }

    const agendamento = this.agendamentoRepository.create({
      barbeiro,
      data: agendamentoData,
    });
    return agendamento;
  }
}
export default CreateAgendamentoService;
