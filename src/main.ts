import express, { Request, Response } from 'express';
import pgp from 'pg-promise';

const app = express();
app.use(express.json());

app.post("/transactions", async function (req: Request, res: Response) {
  const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  await connection.$pool.end();
  
  res.end();
});

app.listen(3000);
