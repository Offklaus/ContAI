export type Transaction = {
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
};

