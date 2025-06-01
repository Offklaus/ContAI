export type Transaction = {
  id: number;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
};

