import { Request, Response, NextFunction, response } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  sub: string;
}

export function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authToken = req.headers.authorization;

  if (!authToken) {
    return response.status(401).end();
  }

  const [, token] = authToken.split(' ');

  try {
    const { sub } = verify(
      token,
      '2d36af5de9021b562e53723a75d6ca7d'
    ) as IPayload;

    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not verified' });
  }

  return next();
}
