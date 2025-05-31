import React, { useState } from 'react';
import { Transaction } from '../types/Transaction';
import './forms.css';

type Props = {
  onAdd: (transaction: Transaction) => void;
};

const TransactionForm = ({ onAdd }: Props) => {
  const [form, setForm] = useState<{
    date: string;
    description: string;
    amount: string;
    type: 'credit' | 'debit';
  }>({
    date: '',
    description: '',
    amount: '',
    type: 'credit'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { date, description, amount, type } = form;
    if (!date || !description || !amount || !['credit', 'debit'].includes(type)) return;

    const amountNumber = parseFloat(amount)

    const amountFormatted = new Intl.NumberFormat('pt-BR',  {
      style: 'currency',
      currency: 'BRL',
    }).format(amountNumber);

    onAdd({ date, description, amount: parseFloat(amount), type });
    setForm({ date: '', description: '', amount: '', type: 'credit' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="date" placeholder="Date (DD/MM/YYYY)" value={form.date} onChange={handleChange} />
      <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
      <input name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} type="number" />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="credit">Credit</option>
        <option value="debit">Debit</option>
      </select>
      <button type="submit">Add</button>
    </form>
  );
};

export default TransactionForm;