import { Request, Response, NextFunction } from 'express';
import { Decode } from '../utils/context';

interface UserType {
  id: string | undefined;
}

export interface IRequest extends Request {
  user?: UserType;
}

export default async (
  req: IRequest,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  try {
    const decoded =
      token !== 'null' ? Decode(token) : { user: { id: undefined } };

    req.user = decoded.user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
