import { Router } from 'express';
import multer from 'multer';
import CreateUsuarioService from '@modules/usuarios/services/CreateUsuarioService';
import UpdateUsuarioAvatarService from '@modules/usuarios/services/UpdateUsuarioAvatarService';
import uploadConfig from '@config/upload';
import garantirAutenticacao from '../../middleware/garantirAutenticacao';

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
