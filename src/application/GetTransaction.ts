import TransactionRepository from '../domain/repository/TransactionRepository';

export default class GetTransaction {
  constructor(readonly transactionRepository: TransactionRepository) {};

  async execute(code: string): Promise<OutPut> {
    const transaction = await this.transactionRepository.get(code);
    return transaction;


  }
}

type OutPut = {
  code: string,
  amount: number,
  numberInstallments: number,
  paymentMethod: string
  installments: { number: number, amount: number }[];
};