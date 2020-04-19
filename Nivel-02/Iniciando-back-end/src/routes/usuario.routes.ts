import { Router } from 'express';

import CreateUsuarioService from '../services/usuario/CreateUsuarioService';

const usuairosRouter = Router();

usuairosRouter.post('/', async (request, response) => {
  try {
    const { nome, email, senha } = request.body;
    const createUsuario = new CreateUsuarioService();
    const usuario = await createUsuario.execute({ nome, email, senha });
    delete usuario.senha;
    return response.json(usuario);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default usuairosRouter;
