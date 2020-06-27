import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';

interface Request {
  usuario_id: string;
  avatarFileName: string;
}

class UpdateUsuarioAvatarService {
  public async execute({
    usuario_id,
    avatarFileName,
  }: Request): Promise<Usuario> {
    const usuarioRespository = getRepository(Usuario);

    const usuario = await usuarioRespository.findOne(usuario_id);

    if (!usuario) {
      throw new AppError(
        'Somente usuario autenticado podem modar o avatar',
        401,
      );
    }
    if (usuario.avatar) {
      const usuatioAvatarFilePath = path.join(
        uploadConfig.diretorio,
        usuario.avatar,
      );
      const usuarioAvatarFileExiste = await fs.promises.stat(
        usuatioAvatarFilePath,
      );
      if (usuarioAvatarFileExiste) {
        await fs.promises.unlink(usuatioAvatarFilePath);
      }
    }
    usuario.avatar = avatarFileName;
    await usuarioRespository.save(usuario);
    return usuario;
  }
}
export default UpdateUsuarioAvatarService;
