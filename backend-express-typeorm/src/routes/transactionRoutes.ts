import { Router } from 'express';
import { AppDataSource } from '../typeorm.config';
import { Transaction } from '../entities/Transaction';

const router = Router();
const repo = AppDataSource.getRepository(Transaction);

router.get('/', async (req, res) => {
  const transactions = await repo.find();
  res.json(transactions);
});

router.post('/', async (req, res) => {
  const data = repo.create(req.body);
  const result = await repo.save(data);
  res.status(201).json(result);
});

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  await repo.delete(id);
  res.status(204).send();
});

export default router;
