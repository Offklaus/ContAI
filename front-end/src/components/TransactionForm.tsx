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

  const [error, setError] = useState('');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { date, description, amount, type } = form;
    if (!date || !description || !amount || !['credit', 'debit'].includes(type)) return;
    const amountNumber = parseFloat(amount)
    const parsedAmount = parseFloat(amount);

    // Verifica se a data é válida/
    if(!isValidDate(date)) {
      setError('A data deve estar no formato DD/MM/AAAA e ser válida.');
      return;
    }
    
    // Verifica se o valor é um número positivo
    if (isNaN(parsedAmount) || parsedAmount <=0) {
      alert('O valor deve ser um número positivo.');
      return;
    }

    const amountFormatted = new Intl.NumberFormat('pt-BR',  {
      style: 'currency',
      currency: 'BRL',
    }).format(amountNumber);

    setError('');
    onAdd({ date, description, amount: parseFloat(amount), type });
    setForm({ date: '', description: '', amount: '', type: 'credit' });
  };

  // Função para validar a data no formato DD/MM/YYYY
  function isValidDate(date: string): boolean {
    // Verifica se a data está no formato DD/MM/YYYY
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!regex.test(date)) return false;
    //valida se é uma data real
    const[day, month, year] = date.split('/').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return (
      dateObj.getFullYear() === year &&
      dateObj.getMonth() === month - 1 &&
      dateObj.getDate() === day
    );
  }

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