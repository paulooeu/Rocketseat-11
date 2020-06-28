import Usuario from '../infra/typeorm/entities/Usuario'
import ICriarUsuarioDTO from '../dtos/ICriarUsuarioDTO'

export default interface IUsuarioRepository{
  findById(id:string ):Promise<Usuario|undefined>;
  findByEmail(email:string ):Promise<Usuario|undefined>;
  create(data:ICriarUsuarioDTO):Promise<Usuario>
  save(usuario:Usuario):Promise<Usuario>
}