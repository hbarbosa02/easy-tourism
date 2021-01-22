import { format } from 'date-fns';
import { Response } from 'express';
import { IRequest } from '../middlewares/auth';

import knex from '../database/connection';

import Stone from '../lib/Payments/Stone';

export default class PaymentController {
  async validate(req: IRequest, res: Response): Promise<Response> {
    try {
      const stone = new Stone();
      const isValid = stone.validate(req.body);

      if (isValid) return res.status(200).json({ success: 'ok' });

      return res.status(200).json({ error: 'Cartão não é valido.' });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao tentar validar o cartão.', data: err });
    }
  }

  async create(req: IRequest, res: Response): Promise<Response> {
    try {
      const stone = new Stone();
      const isValid = stone.validate(req.body);

      if (!isValid) res.status(200).json({ error: 'Cartão não é valido.' });

      const cardHash = await stone.encrypt(req.body);

      const user = await knex('users').where({ id: req.user?.id }).first();
      const travel = await knex('travels')
        .where({ id: Number(req.body.travel_id) })
        .first();

      const transactionData = await stone.createTransaction({
        ...req.body,
        amount: travel.price,
        cardHash,
        customer: {
          external_id: String(user.id),
          name: user.name,
          type: 'individual',
          country: 'br',
          email: user.email,
          documents: [
            {
              type: 'cpf',
              number: user.cpf, // Ex.: 00000000000
            },
          ],
          phone_numbers: [user.phone], // Ex.: +5511999998888
          birthday: format(new Date(user.birthday), 'yyyy-MM-dd'),
        },
        items: [
          {
            id: req.body.travel_id,
            title: 'Pacote de Viagens',
            unit_price: travel.price, // Ex.: R$14,99 = 1499
            quantity: req.body.quantity,
            tangible: false,
          },
        ],
      });

      if (transactionData.status === 'refused') {
        return res.status(401).json({
          error: 'Operação foi recusada pela API de pagamento.',
          transactionData,
        });
      } else if (transactionData.status === 'paid') {
        return res
          .status(200)
          .json({ success: 'Pagamento realizado com sucesso' });
      }

      return res.status(200).json({ transactionData });
    } catch (err) {
      return res
        .status(400)
        .json({ error: 'Erro ao tentar efetuar o pagamento.' });
    }
  }
}
