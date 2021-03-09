import { Response } from 'express';
import { IRequest } from '../middlewares/auth';
import knex from '../database/connection';

export default class TravelController {
  async index(req: IRequest, res: Response): Promise<Response> {
    return res.status(200).json({
      destinations: await knex('destinations'),
    });
  }

  async show(req: IRequest, res: Response): Promise<Response> {
    const destinyId = req.params.destiny_id;

    const destiny = await knex('destinations').where({ id: destinyId }).first();

    if (!destiny) {
      return res.status(400).json({ error: 'Travel does not exists' });
    }

    return res.status(200).json({ destiny });
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    const user =
      req.user?.id && (await knex('users').where({ id: req.user?.id }).first());
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const trx = await knex.transaction();

    try {
      await trx('destinations').insert({ ...req.body });
      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class.',
      });
    }
  }

  async update(req: IRequest, res: Response): Promise<Response> {
    const destinyId = req.params.destiny_id;

    const user =
      req.user?.id && (await knex('users').where({ id: req.user?.id }).first());
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const trx = await knex.transaction();

    try {
      const destiny = await trx('destinations')
        .where({ id: destinyId })
        .first();

      if (!destiny) {
        await trx.commit();

        return res.status(400).json({ error: "Destiny doesn't exists." });
      }

      await trx('destinations').where({ id: destinyId }).update(req.body);

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res.status(400).json({
        error: 'Unexpected error while creating new class.',
      });
    }
  }

  async delete(req: IRequest, res: Response): Promise<Response> {
    const destinyId = req.params.destiny_id;

    const user =
      req.user?.id && (await knex('users').where({ id: req.user?.id }).first());

    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    await knex('destinations').where({ id: destinyId }).delete();

    return res.status(201).send();
  }
}
