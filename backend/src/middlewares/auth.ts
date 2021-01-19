import { Request, Response, NextFunction } from 'express';
import { Decode } from '../utils/context';

interface UserType {
  id: string;
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

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = Decode(token);
    req.user = decoded.user;

    return next();
  } catch (error) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
