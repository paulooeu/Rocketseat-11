import Agendamento from '../infra/typeorm/entities/Agendamento'
import ICriarAgendamentoDTO from '../dto/ICriarAgendamentoDTO'

export default interface IAgendamentoRepository{
  create(data:ICriarAgendamentoDTO):Promise<Agendamento>
  buscarData(date: Date): Promise<Agendamento | undefined>;
}