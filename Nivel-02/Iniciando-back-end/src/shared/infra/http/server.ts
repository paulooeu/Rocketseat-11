import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import routes from './routes';
import '@shared/infra/typeorm';

const app = express();
app.use(express.json());
app.use('/files', express.static(uploadConfig.diretorio));
app.use(routes);
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }
  console.error(err);
  return response.status(560).json({
    status: 'error',
    message: 'Erro no Servidor',
  });
});

app.listen(3333, () => {
  console.log('Servidor iniciado');
});
