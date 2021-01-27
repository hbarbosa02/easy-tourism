import pagarme, { Transaction, CreateTransactionInput } from 'pagarme';
import dotenv from 'dotenv';

import { PaymentInput } from './IPayments';

dotenv.config();

export default class Stone {
  API_KEY: string;
  SECRET_KEY: string;

  constructor() {
    this.API_KEY = process.env.PAYMENT_METHOD_API_KEY || '';
    this.SECRET_KEY = process.env.PAYMENT_METHOD_SECRET_KEY || '';
  }

  validate(data: PaymentInput): boolean {
    const cardValidations = pagarme.validate({
      card: {
        card_cvv: data.cardCVV,
        card_expiration_date: data.cardExpirationDate,
        card_holder_name: data.cardHolderName,
        card_number: data.cardNumber,
      },
    });

    return !!(
      cardValidations.card.card_cvv &&
      cardValidations.card.card_expiration_date &&
      cardValidations.card.card_holder_name &&
      cardValidations.card.card_number
    );
  }

  async encrypt(data: PaymentInput): Promise<string> {
    return pagarme.client
      .connect({ encryption_key: this.SECRET_KEY })
      .then(client =>
        client.security.encrypt({
          card_cvv: data.cardCVV,
          card_expiration_date: data.cardExpirationDate,
          card_holder_name: data.cardHolderName,
          card_number: data.cardNumber,
        }),
      )
      .then(cardHash => cardHash)
      .catch(err => err);
  }

  async createTransaction(data: PaymentInput): Promise<Transaction> {
    return pagarme.client.connect({ api_key: this.API_KEY }).then(client =>
      client.transactions.create({
        amount: data.amount,
        card_cvv: data.cardCVV,
        card_expiration_date: data.cardExpirationDate,
        card_holder_name: data.cardHolderName,
        card_number: data.cardNumber,
        payment_method: 'credit_card',
        card_hash: data.cardHash,
        installments: data.installments || '1',
        async: false,
        customer: data.customer,
        items: data.items,
        capture: true,
        billing: {
          name: process.env.COMPANY_NAME,
          address: {
            country: 'br',
            state: process.env.COMPANY_STATE,
            city: process.env.COMPANY_CITY,
            neighborhood: process.env.COMPANY_NEIGHBORHOOD,
            street: process.env.COMPANY_STREET,
            street_number: process.env.COMPANY_STREET_NUMBER,
            zipcode: process.env.COMPANY_ZIPCODE,
          },
        },
      }),
    );
  }

  async findTransctions(): Promise<Transaction[]> {
    return pagarme.client
      .connect({ api_key: this.API_KEY })
      .then(client => client.transactions.all());
  }

  async findTransction(transactionId: string): Promise<Transaction> {
    return pagarme.client
      .connect({ api_key: this.API_KEY })
      .then(client => client.transactions.find({ id: transactionId }));
  }

  async refundTransaction(transactionId: string): Promise<Transaction> {
    return pagarme.client.connect({ api_key: this.API_KEY }).then(client =>
      client.transactions.refund({
        id: transactionId,
      }),
    );
  }

  async partialRefundTransaction(
    transactionId: string,
    amount: number,
  ): Promise<Transaction> {
    return pagarme.client.connect({ api_key: this.API_KEY }).then(client =>
      client.transactions.refund({
        id: transactionId,
        amount,
      }),
    );
  }
}
