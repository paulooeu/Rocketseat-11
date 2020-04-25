import { Router } from 'express';
import AutenticarUsuarioService from '../services/autenticacao/AutenticarUsuarioService';

const usuairosRouter = Router();

usuairosRouter.post('/', async (request, response) => {
  const { email, senha } = request.body;
  const autenticarUsuario = new AutenticarUsuarioService();
  const { usuario, token } = await autenticarUsuario.execute({
    email,
    senha,
  });
  delete usuario.senha;
  return response.json({ usuario, token });
});

export default usuairosRouter;
