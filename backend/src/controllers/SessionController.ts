import { Response, Request } from 'express';
import { compareSync } from 'bcryptjs';

import knex from '../database/connection';
import { Encode } from '../utils/context';

export default class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();

    if (!user || !compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Email ou senha incorretos!' });
    }

    return res.json({ token: Encode(user) });
  }
}
