import { startOfHour } from 'date-fns';

import AppError from '@shared/errors/AppError';
import Agendamento from '../infra/typeorm/entities/Agendamento';
import IAgendamentoRepository from '../repositories/IAgendamentosRepository';
import  {injectable, inject} from 'tsyringe'

interface IRequest {
  barbeiro_id: string;
  data: Date;
}

@injectable()
class CreateAgendamentoService {

  constructor(
    @inject('AgendamentoRepository')
private agendamentoRepository:IAgendamentoRepository,
  ){}

  public async execute({ data, barbeiro_id }: IRequest): Promise<Agendamento> {
    
    const agendamentoData = startOfHour(data);

    const buscarAgendamento = await this.agendamentoRepository.buscarData(
      agendamentoData,
    );
    if (buscarAgendamento) {
      throw new AppError('Já existe agendamento nesse horario.');
    }

    const agendamento =  await this.agendamentoRepository.create({
      barbeiro_id,
      data: agendamentoData,
    });
    
    return agendamento;
  }
}
export default CreateAgendamentoService;
