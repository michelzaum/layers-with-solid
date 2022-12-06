import ExpressAdapter from './infra/api/ExpressAdapter';
import Router from './infra/api/Router';
import PostregSQLAdapter from './infra/database/PostgreSQLAdapter';
import TransactionDatabaseRepository from './infra/repository/TransactionDatabaseRepository';

const connection = new PostregSQLAdapter();
const transactionRepository = new TransactionDatabaseRepository(connection);

const httpServer = new ExpressAdapter();
const router = new Router(httpServer, transactionRepository);
router.init();
httpServer.listen(3000);