import { Response } from 'express';
import { hashSync } from 'bcryptjs';

import { IRequest } from '../middlewares/auth';
import knex from '../database/connection';

export default class UserController {
  async index(req: IRequest, res: Response): Promise<Response> {
    const user = await knex('users').where({ id: req.user.id }).first();
    return res.json({ user });
  }

  async list(req: IRequest, res: Response): Promise<Response> {
    const user = await knex('users');
    return res.json({ user });
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    const { name, email, cpf, password, phone } = req.body;

    const user = await knex('users').where({ cpf }).orWhere({ email }).first();

    if (user) {
      return res
        .status(400)
        .json({ error: 'Usuário com dados já existentes!' });
    }

    const trx = await knex.transaction();

    try {
      await trx('users').insert({
        name,
        email,
        cpf,
        phone,
        password: hashSync(password, 8),
        avatar: 'test',
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Unexpected error while creating new class.' });
    }
  }
}
