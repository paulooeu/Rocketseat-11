import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import Usuario from '../../models/Usuario';

interface Request {
  nome: string;
  email: string;
  senha: string;
}

class CreateUsuarioService {
  public async execute({ nome, email, senha }: Request): Promise<Usuario> {
    const usuarioRepository = getRepository(Usuario);
    const checkUsuarioExiste = await usuarioRepository.findOne({
      where: { email },
    });
    if (checkUsuarioExiste) {
      throw new Error('Email já cadastrado.');
    }
    const hashedSenha = await hash(senha, 8);
    const usuario = usuarioRepository.create({
      nome,
      email,
      senha: hashedSenha,
    });
    await usuarioRepository.save(usuario);
    return usuario;
  }
}
export default CreateUsuarioService;
