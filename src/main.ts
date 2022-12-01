import express, { Request, Response } from 'express';
import pgp from 'pg-promise';

const app = express();
app.use(express.json());

app.post("/transactions", async function (req: Request, res: Response) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  await connection.query(`
  insert into branas.transaction (
    code, amount, number_installments, payment_method
  ) values ($1, $2, $3, $4)
  `, [
    req.body.code, req.body.amount, req.body.numberInstallments, req.body.paymentMethod
  ]);
  let number = 1;
  let amount = Math.round((req.body.amount / req.body.numberInstallments) * 100) / 100;
  let diff = Math.round((req.body.amount - amount * req.body.numberInstallments) * 100) / 100;

  while (number <= req.body.numberInstallments) {
    if (number === req.body.numberInstallments) {
      amount += diff;
    };
    
    await connection.query("insert into branas.installments (code, number, amount) values ($1, $2, $3)", [req.body.code, number, amount])
    number++;
  };
  await connection.$pool.end();
  res.end();
});

app.get("/transactions/:code", async function(req: Request, res: Response) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  const transaction = connection.one("select * from branas.transaction where code = $1", [req.params.code]);
  transaction.amount = parseFloat(transaction.amount);
  transaction.paymentMethod = transaction.payment_method = parseFloat(transaction.amount);
  const installments = await connection.query("select * from branas.installment where code = $1", [req.params.code]);
  for (const installment of installments) {
    installment.amount = parseFloat(installment.amount);
  };

  transaction.installments = installments;
  console.log(transaction);
  
  await connection.$pool.end();
  res.json(transaction);
});

app.listen(3000);
