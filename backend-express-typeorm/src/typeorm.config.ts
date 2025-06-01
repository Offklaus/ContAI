import { DataSource } from 'typeorm';
import { Transaction } from './entities/Transaction';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'transaction_db',
  synchronize: true,
  logging: true,
  entities: [Transaction],
  migrations: [],
  subscribers: [],
});
