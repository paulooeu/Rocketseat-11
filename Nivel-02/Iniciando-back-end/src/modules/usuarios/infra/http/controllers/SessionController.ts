import {Request,Response} from 'express'

import {container} from 'tsyringe'

import AutenticarUsuarioService from '@modules/usuarios/services/AutenticarUsuarioService';
 


export default class SessionController {
  public async create (request:Request, response:Response):Promise<Response>{
    const { email, senha } = request.body;
  
    const autenticarUsuario = container.resolve(AutenticarUsuarioService)
    const { usuario, token } = await autenticarUsuario.execute({
      email,
      senha,
    });
    delete usuario.senha;
    return response.json({ usuario, token });
  }
}