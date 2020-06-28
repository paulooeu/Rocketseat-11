import { getRepository, Repository } from 'typeorm';
import IUsuarioRepository from '@modules/usuarios/repositorie/IUsuarioRepository'
import ICriarUsuarioDTO  from '@modules/usuarios/dtos/ICriarUsuarioDTO'
import Usuario from '../entities/Usuario';


class UsuarioRepository implements IUsuarioRepository {

private ormRepository : Repository<Usuario>;
constructor(){
  this.ormRepository = getRepository(Usuario)
}

  public async findById(id:string):Promise<Usuario|undefined>{
const usuario = await this.ormRepository.findOne(id)
return usuario
  }
  public async findByEmail(email:string):Promise<Usuario|undefined>{
    const usuario = await this.ormRepository.findOne({where:{email}})
    return usuario
  }
  public async create(usuarioData:ICriarUsuarioDTO):Promise<Usuario>{
    const agendamento = this.ormRepository.create(usuarioData)

    await  this.ormRepository.save(agendamento)
    return agendamento
  }
  public async save(usuario:Usuario):Promise<Usuario>{
    return this.ormRepository.save(usuario)
  }
}
export default UsuarioRepository;
