import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../config/upload';
import CreateUsuarioService from '../services/usuario/CreateUsuarioService';
import garantirAutenticacao from '../middleware/garantirAutenticacao';
import UpdateUsuarioAvatarService from '../services/usuario/UpdateUsuarioAvatarService';

const usuairosRouter = Router();
const upload = multer(uploadConfig);
usuairosRouter.post('/', async (request, response) => {
  const { nome, email, senha } = request.body;
  const createUsuario = new CreateUsuarioService();
  const usuario = await createUsuario.execute({ nome, email, senha });
  delete usuario.senha;
  return response.json(usuario);
});

usuairosRouter.patch(
  '/avatar',
  garantirAutenticacao,
  upload.single('avatar'),
  async (request, response) => {
    const updateUsuarioAvatar = new UpdateUsuarioAvatarService();
    const usuario = await updateUsuarioAvatar.execute({
      usuario_id: request.usuario.id,
      avatarFileName: request.file.filename,
    });
    delete usuario.senha;
    return response.json(usuario);
  },
);
export default usuairosRouter;
