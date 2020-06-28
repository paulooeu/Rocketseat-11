import {Request,Response} from 'express'


import {container} from 'tsyringe'
import UpdateUsuarioAvatarService from '@modules/usuarios/services/UpdateUsuarioAvatarService';


export default class UsuarioAvatarController {
  public async update (request:Request, response:Response):Promise<Response>{
   
    const updateUsuarioAvatar = container.resolve(UpdateUsuarioAvatarService)
    const usuario = await updateUsuarioAvatar.execute({
      usuario_id: request.usuario.id,
      avatarFileName: request.file.filename,
    });
    delete usuario.senha;
    return response.json(usuario);
  }
}