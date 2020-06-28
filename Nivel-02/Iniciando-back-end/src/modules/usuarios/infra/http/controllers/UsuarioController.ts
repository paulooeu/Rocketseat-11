import {Request,Response} from 'express'


import {container} from 'tsyringe'
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';


export default class UsuarioController {
  public async create (request:Request, response:Response):Promise<Response>{
    const { nome, email, senha } = request.body;
  
    const createUsuario = container.resolve(CreateUsuarioService)
    const usuario = await createUsuario.execute({ nome, email, senha });
    delete usuario.senha;
    return response.json(usuario);
  }
}