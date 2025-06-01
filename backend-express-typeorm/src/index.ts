import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { AppDataSource } from './typeorm.config';
import transactionRoutes from './routes/transactionRoutes';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/transactions', transactionRoutes);

AppDataSource.initialize().then(() => {
  console.log('Connected to the database');
  app.listen(3001, () => {
    console.log('Server running on http://localhost:3001');
  });
}).catch((error) => console.error(error));
