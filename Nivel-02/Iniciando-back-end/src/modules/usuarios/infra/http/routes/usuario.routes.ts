import { Router } from 'express';
import multer from 'multer';


import uploadConfig from '@config/upload';
import garantirAutenticacao from '../../middleware/garantirAutenticacao';
import UsuarioController from '../controllers/UsuarioController'
import UsuarioAvatarController  from '../controllers/UsuarioAvatarController'

import{container} from   'tsyringe' 

const usuairosRouter = Router();
const usuarioController  = new UsuarioController()
const usuarioAvatarController = new UsuarioAvatarController()
const upload = multer(uploadConfig);


usuairosRouter.post('/',usuarioController.create);

usuairosRouter.patch(
  '/avatar',
  garantirAutenticacao,
  upload.single('avatar'),usuarioAvatarController.update
);
export default usuairosRouter;
