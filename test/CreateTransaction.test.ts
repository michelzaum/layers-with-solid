import CreateTransaction from "../src/application/CreateTransaction";
import GetTransaction from "../src/application/GetTransaction";
import PostregSQLAdapter from "../src/infra/database/PostgreSQLAdapter";
import TransactionDatabaseRepository from "../src/infra/repository/TransactionDatabaseRepository";

test("Should create a transaction", async function () {
  const connection = new PostregSQLAdapter();
  const transactionRepository = new TransactionDatabaseRepository(connection);
  // const transactionRepository = new TransactionMemoryRepository();
  
  const code = `${Math.floor(Math.random() * 1000)}}`;
  const createTransaction = new CreateTransaction(transactionRepository);
  const input = {
    code,
    amount: 1000,
    numberInstallments: 12,
    paymentMethod: "credit_card",
  };
  await createTransaction.execute(input);

  const getTransaction = new GetTransaction(transactionRepository);
  const transaction = await getTransaction.execute(code);
  expect(transaction.code).toBe(code);
  expect(transaction.amount).toBe(1000);
  expect(transaction.paymentMethod).toBe("credit_card");
  expect(transaction.installments).toHaveLength(12);
  expect(transaction.installments[0].amount).toBe(83.33);
  expect(transaction.installments[11].amount).toBe(83.37);
  await connection.close();
});