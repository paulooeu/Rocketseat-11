import { getRepository, Repository } from 'typeorm';
import IAgendamentoRepository from '@modules/agendamentos/repositories/IAgendamentosRepository'
import ICriarAgendamentoDTO  from '@modules/agendamentos/dto/ICriarAgendamentoDTO'
import Agendamento from '../entities/Agendamento';


class AgendamentoRepository implements IAgendamentoRepository {

private ormRepository : Repository<Agendamento>;
constructor(){
  this.ormRepository = getRepository(Agendamento)
}

  public async buscarData(data: Date): Promise<Agendamento | undefined> {
    const buscarAgendamento = await this.ormRepository.findOne({
      where: { data },
    });
    return buscarAgendamento 
  }
  public async create({id,data}:ICriarAgendamentoDTO):Promise<Agendamento>{
    const agendamento = this.ormRepository.create({id,data})

    await  this.ormRepository.save(agendamento)
    return agendamento
  }
}
export default AgendamentoRepository;
