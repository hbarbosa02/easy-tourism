import { CustomerInput, BillingInput, ItemInput } from 'pagarme';

export interface PaymentInput {
  amount?: number;
  cardNumber: string;
  cardHolderName: string;
  cardExpirationDate: string;
  cardCVV: string;
  installments?: string;
  cardHash?: string;
  customer?: CustomerInput;
  billing?: BillingInput;
  items?: ItemInput[];
}
