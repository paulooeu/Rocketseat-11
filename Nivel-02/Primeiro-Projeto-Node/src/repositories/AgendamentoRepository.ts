import { isEqual } from 'date-fns';
import Agendamento from '../models/Agendamento';

interface CreateAgendamentoDTO {
  barbeiro: string;
  data: Date;
}
class AgendamentoRepository {
  private agendamentoList: Agendamento[];

  constructor() {
    this.agendamentoList = [];
  }

  public all(): Agendamento[] {
    return this.agendamentoList;
  }

  public buscarData(data: Date): Agendamento | null {
    const buscarAgendamento = this.agendamentoList.find((agendamento) =>
      isEqual(data, agendamento.data),
    );
    return buscarAgendamento || null;
  }

  public create({ barbeiro, data }: CreateAgendamentoDTO): Agendamento {
    const agendamento = new Agendamento({ barbeiro, data });
    this.agendamentoList.push(agendamento);
    return agendamento;
  }
}
export default AgendamentoRepository;
