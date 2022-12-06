import pgp from 'pg-promise';
import Connection from "./Connection";

export default class PostregSQLAdapter implements Connection {
  connection: any;

  constructor() {
    this.connection = pgp()("postgres://postgres:123456@localhost:5432/app");
  };

  query(statement: string, params: any): Promise<any> {
    return this.connection.query(statement, params);
  };

  one(statement: string, params: any): Promise<any> {
    return this.connection.one(statement, params);
  };

  close(): Promise<void> {
    return this.connection.$pool.end();
  };
};