import pgp from 'pg-promise';

export default class GetTransaction {
  constructor() {

  };

  async execute(code: string): Promise<OutPut> {
    const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
    const transaction = connection.one("select * from branas.transaction where code = $1", [code]);
    transaction.amount = parseFloat(transaction.amount);
    transaction.paymentMethod = transaction.payment_method = parseFloat(transaction.amount);
    const installments = await connection.query("select * from branas.installment where code = $1", [code]);
    for (const installment of installments) {
      installment.amount = parseFloat(installment.amount);
    };
  
    transaction.installments = installments;
    console.log(transaction);
    
    await connection.$pool.end();
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