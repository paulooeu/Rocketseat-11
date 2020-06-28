import {container} from 'tsyringe'
import IAgendamentoRepository from '@modules/agendamentos/repositories/IAgendamentosRepository'
import AgendamentoReposiroty from '@modules/agendamentos/infra/typeorm/repositories/AgendamentoRepository'


import IUsuarioRepository from '@modules/usuarios/repositorie/IUsuarioRepository'
import UsuarioReposiroty from '@modules/usuarios/infra/typeorm/repositories/UsuarioRepositorie'

container.registerSingleton<IAgendamentoRepository>('AgendamentoRepository',AgendamentoReposiroty)


container.registerSingleton<IUsuarioRepository>('UsuarioRepository',UsuarioReposiroty)