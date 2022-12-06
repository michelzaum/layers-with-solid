import express, { Request, Response } from "express";
import CreateTransaction from "../../application/CreateTransaction";
import GetTransaction from "../../application/GetTransaction";
import PostregSQLAdapter from "../database/PostgreSQLAdapter";
import TransactionDatabaseRepository from "../repository/TransactionDatabaseRepository";

export default class Router {
  constructor() {};

  async init() {
    const app = express();
    app.use(express.json());

    const connection = new PostregSQLAdapter();
    const transactionRepository = new TransactionDatabaseRepository(connection);

    app.post("/transactions", async function (req: Request, res: Response) {
      const createTransaction = new CreateTransaction(transactionRepository);
      await createTransaction.execute(req.body);

      res.end();
    });

    app.get("/transactions/:code", async function(req: Request, res: Response) {
      const getTransaction = new GetTransaction(transactionRepository);
      const transaction = await getTransaction.execute(req.params.code);
      res.json(transaction);
    });

    app.listen(3000);
  };
};