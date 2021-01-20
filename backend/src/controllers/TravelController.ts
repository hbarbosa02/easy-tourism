import { Response } from 'express';
import { hashSync } from 'bcryptjs';

import { IRequest } from '../middlewares/auth';
import knex from '../database/connection';

export default class TravelController {
  async index(req: IRequest, res: Response): Promise<Response> {
    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const travels = await knex('travels');

    const completeTravels = travels.map(async travel => {
      const image = await knex('travel_images').where({ travel_id: travel.id });

      return {
        image,
        ...travel,
      };
    });

    return res.json({ travels: await Promise.all(completeTravels) });
  }

  async show(req: IRequest, res: Response): Promise<Response> {
    const travelId = req.params.travel_id;

    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const travel = await knex('travels').where({ id: travelId }).first();

    if (!travel) {
      return res.status(400).json({ error: 'Travel does not exists' });
    }

    travel.image = await knex('travel_images').where({ travel_id: travel.id });

    return res.json({ travel });
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    const {
      origin,
      destiny,
      price,
      travel_date: travelDate,
      quantity,
      images,
    } = req.body;

    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const trx = await knex.transaction();

    try {
      const [travelId] = await trx('travels').insert({
        origin,
        destiny,
        price,
        travel_date: travelDate,
        quantity,
      });

      // insere as imagens

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Unexpected error while creating new class.' });
    }
  }

  async update(req: IRequest, res: Response): Promise<Response> {
    const travelId = req.params.travel_id;
    const {
      origin,
      destiny,
      price,
      travel_date: travelDate,
      quantity,
      images,
    } = req.body;

    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const trx = await knex.transaction();

    try {
      const travel = await trx('travels').where({ id: travelId }).first();

      if (!travel) {
        await trx.commit();

        return res.status(400).json({ error: "Travel doesn't exists." });
      }

      await trx('travels')
        .where({ id: travelId })
        .update({
          origin: origin || travel.origin,
          destiny: destiny || travel.destiny,
          price: price || travel.price,
          travel_date: travelDate || travel.travel_date,
          quantity: quantity || travel.quantity,
        });

      // atualiza as imagens

      await trx.commit();

      return res.status(201).send();
    } catch (error) {
      await trx.rollback();

      return res
        .status(400)
        .json({ error: 'Unexpected error while creating new class.' });
    }
  }

  async delete(req: IRequest, res: Response): Promise<Response> {
    const travelId = req.params.travel_id;
    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    await knex('travels').where({ id: travelId }).delete();

    return res.status(201).send();
  }
}
