import { Response } from 'express';
import { hashSync } from 'bcryptjs';

import { IRequest } from '../middlewares/auth';
import knex from '../database/connection';

export default class UserController {
  async show(req: IRequest, res: Response): Promise<Response> {
    const user = await knex('users').where({ id: req.user?.id }).first();
    return res.status(200).json({ user });
  }

  async index(req: IRequest, res: Response): Promise<Response> {
    const user = await knex('users');
    return res.status(200).json({ user });
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    const { email, cpf, password } = req.body;

    const user = await knex('users').where({ cpf }).orWhere({ email }).first();

    if (user) {
      return res
        .status(400)
        .json({ error: 'Usuário com dados já existentes!' });
    }

    const trx = await knex.transaction();

    try {
      await trx('users').insert({
        ...req.body,
        password: hashSync(password, 8),
      });

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({ error: 'Erro ao cadastrar usuário.' });
    }
  }
}
