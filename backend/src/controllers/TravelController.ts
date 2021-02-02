import { Response } from 'express';
import { subHours } from 'date-fns';
import { IRequest } from '../middlewares/auth';
import knex from '../database/connection';

export default class TravelController {
  async index(req: IRequest, res: Response): Promise<Response> {
    const params = req.query;

    const user = await knex('users').where({ id: req.user?.id }).first();

    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const travels = await knex('travels').where(builder => {
      if (!params || !params.leaving)
        builder.where('leaving', '>=', subHours(new Date(), 3));

      if (params && params.destination)
        builder.where('destination', 'LIKE', params.destination);

      if (params && (params.leaving || params.arrival)) {
        const leaving = params.leaving || new Date(2000, 1, 1);
        const arrival = params.arrival || new Date(2077, 1, 1);

        builder.where('leaving', '>=', leaving);
        builder.where('arrival', '<=', arrival);
      }
    });

    const completeTravels = travels.map(async travel => {
      const image = await knex('travel_images').where({ travel_id: travel.id });

      return {
        image,
        ...travel,
      };
    });

    return res
      .status(200)
      .json({ travels: await Promise.all(completeTravels) });
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

    return res.status(200).json({ travel });
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    const { images } = req.body;

    const user = await knex('users').where({ id: req.user?.id }).first();
    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    const trx = await knex.transaction();

    try {
      const travel = await trx('travels').insert({ ...req.body });

      // insere as imagens

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
    const travelId = req.params.travel_id;
    const { images } = req.body;

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

      await trx('travels').where({ id: travelId }).update(req.body);

      // atualiza as imagens

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
    const travelId = req.params.travel_id;

    const user = await knex('users').where({ id: req.user?.id }).first();

    if (!user) {
      return res.status(400).json({ error: 'token not authorized' });
    }

    await knex('travels').where({ id: travelId }).delete();

    return res.status(201).send();
  }
}
