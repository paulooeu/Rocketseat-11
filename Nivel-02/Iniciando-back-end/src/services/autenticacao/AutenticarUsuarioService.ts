import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import Usuario from '../../models/Usuario';
import authConfig from '../../config/auth';
import AppError from '../../errors/AppError';

interface Request {
  email: string;
  senha: string;
}
interface Response {
  usuario: Usuario;
  token: string;
}

class AutenticarUsuarioService {
  public async execute({ email, senha }: Request): Promise<Response> {
    const usuarioRepository = getRepository(Usuario);
    const usuario = await usuarioRepository.findOne({ where: { email } });

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
