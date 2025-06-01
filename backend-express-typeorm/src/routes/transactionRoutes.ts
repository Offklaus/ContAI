import { Router } from 'express';
import { AppDataSource } from '../typeorm.config';
import { Transaction } from '../entities/Transaction';

const router = Router();
const repo = AppDataSource.getRepository(Transaction);

// busca todas as transações
router.get('/', async (req, res) => {
  const transactions = await repo.find();
  res.json(transactions);
});

// busca uma transação através do ID
router.post('/', async (req, res) => {
  const data = repo.create(req.body);
  const result = await repo.save(data);
  res.status(201).json(result);
});

//exclui uma transação através do ID
router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await repo.delete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting transaction' });
  }
});

export default router;
