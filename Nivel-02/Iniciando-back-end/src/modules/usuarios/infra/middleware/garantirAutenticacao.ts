import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}
export default function garantirAutenticacao(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const autenticarHead = request.headers.authorization;
  if (!autenticarHead) {
    throw new AppError('Token não existe.', 401);
  }

  const [, token] = autenticarHead.split(' ');
  try {
    const decodificado = verify(token, authConfig.jwt.secret);
    const { sub } = decodificado as TokenPayload;
    request.usuario = {
      id: sub,
    };
    return next();
  } catch {
    throw new AppError('Token invalido.', 401);
  }
}
