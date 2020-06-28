
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuarioRepository from '../repositorie/IUsuarioRepository'

import {injectable,inject} from 'tsyringe'

interface Request {
  email: string;
  senha: string;
}
interface Response {
  usuario: Usuario;
  token: string;
}

@injectable()
class AutenticarUsuarioService {
  constructor(
    @inject('UsuarioRepository')
    private usuarioRepository:IUsuarioRepository,  ){}
  public async execute({ email, senha }: Request): Promise<Response> {
        const usuario = await this.usuarioRepository.findByEmail(email)

    if (!usuario) {
      throw new AppError('Email/Senha incorreto', 401);
    }
    const senhaComparada = await compare(senha, usuario.senha);
    if (!senhaComparada) {
      throw new AppError('Email/Senha incorreto', 401);
    }
    const { secret, expiresIn } = authConfig.jwt;
    const token = sign({}, secret, {
      subject: usuario.id,
      expiresIn,
    });
    return { usuario, token };
  }
}
export default AutenticarUsuarioService;
