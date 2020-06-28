
import path from 'path';
import fs from 'fs';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Usuario from '../infra/typeorm/entities/Usuario';
import IUsuarioRepository from '../repositorie/IUsuarioRepository'
import {injectable,inject} from 'tsyringe'

interface Request {
  usuario_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateUsuarioAvatarService {
  constructor(
    @inject("UsuarioRepository")
    private usuarioRepository:IUsuarioRepository,  ){}
  public async execute({
    usuario_id,
    avatarFileName,
  }: Request): Promise<Usuario> {
    

    const usuario = await this.usuarioRepository.findById(usuario_id)

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
    await this.usuarioRepository.save(usuario);
    return usuario;
  }
}
export default UpdateUsuarioAvatarService;
