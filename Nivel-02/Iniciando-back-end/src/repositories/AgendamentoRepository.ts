import { EntityRepository, Repository } from 'typeorm';
import Agendamento from '../models/Agendamento';

@EntityRepository(Agendamento)
class AgendamentoRepository extends Repository<Agendamento> {
  public async buscarData(data: Date): Promise<Agendamento | null> {
    const buscarAgendamento = await this.findOne({
      where: { data },
    });
    return buscarAgendamento || null;
  }
}
export default AgendamentoRepository;
