import {Request,Response} from 'express'
import { parseISO } from 'date-fns';

import {container} from 'tsyringe'
import CreateAgendamentoService from '@modules/agendamentos/services/CreateAgendamentoService';

export default class AgendamentoController {
  public async create (request:Request, response:Response):Promise<Response>{
    const { barbeiro_id, data } = request.body;
    const parsedDate = parseISO(data);
    
    const createAgendamentoService = container.resolve(CreateAgendamentoService)
    const agendamento = await createAgendamentoService.execute({
      barbeiro_id,
      data: parsedDate,
    });
    return response.json(agendamento);
  }
}