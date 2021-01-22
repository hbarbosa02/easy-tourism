import { Response, Request } from 'express';
import { compareSync, hashSync } from 'bcryptjs';

import knex from '../database/connection';
import { Encode } from '../utils/context';

export default class SessionController {
  async create(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();

    if (!user || !compareSync(password, user.password)) {
      return res.status(400).json({ error: 'Email ou senha incorretos!' });
    }

    return res.status(201).json({ token: Encode(user) });
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const user = await knex('users').where({ email }).first();

    if (!user) {
      return res.status(400).json({ error: 'Usuário não encontrado!' });
    }

    if (compareSync(password, user.password)) {
      return res
        .status(400)
        .json({ error: 'Digite uma senha diferente da cadastrada!' });
    }

    const trx = await knex.transaction();

    try {
      await trx('users')
        .update({
          password: hashSync(password, 8),
        })
        .where({ email });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Erro ao atualizar senha do usuário!.' });
    }
  }
}
