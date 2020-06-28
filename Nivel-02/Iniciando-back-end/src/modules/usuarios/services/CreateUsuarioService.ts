
import { hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuarioRepository from '../repositorie/IUsuarioRepository'
import {injectable,inject} from 'tsyringe'

interface Request {
  nome: string;
  email: string;
  senha: string;
}

@injectable()
class CreateUsuarioService {
  constructor( 
    @inject('UsuarioRepository')
    private usuarioRepository:IUsuarioRepository,  ){}
  public async execute({ nome, email, senha }: Request): Promise<Usuario> {
    
    const checkUsuarioExiste = await this.usuarioRepository.findByEmail(email)
    if (checkUsuarioExiste) {
      throw new AppError('Email já cadastrado.');
    }
    const hashedSenha = await hash(senha, 8);
    const usuario = await this.usuarioRepository.create({
      nome,
      email,
      senha: hashedSenha,
    });
    
    return usuario;
  }
}
export default CreateUsuarioService;
