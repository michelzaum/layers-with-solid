import express, { Request, Response } from 'express';
import CreateTransaction from './application/CreateTransaction';
import GetTransaction from './application/GetTransaction';

const app = express();
app.use(express.json());

app.post("/transactions", async function (req: Request, res: Response) {
  const createTransaction = new CreateTransaction();
  await createTransaction.execute(req.body);

  res.end();
});

app.get("/transactions/:code", async function(req: Request, res: Response) {
  const getTransaction = new GetTransaction();
  const transaction = await getTransaction.execute(req.params.code);
  res.json(transaction);
});

app.listen(3000);
