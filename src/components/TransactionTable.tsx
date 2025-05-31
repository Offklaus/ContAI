import React from 'react';
import { Transaction } from '../types/Transaction';
import './style.css';

type Props = {
  transactions: Transaction[];
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style : 'currency',
    currency : 'BRL',
  }).format(value);

const groupByMonth = (transactions: Transaction[]): Record<string, Transaction[]> => {
  const groups: Record<string, Transaction[]> = {};

  // Verifica se a transação tem uma data válida
  transactions.forEach((t) => {
    if (!t.date || typeof t.date !== 'string') return;

    // Verifica se a data está no formato esperado (DD/MM/YYYY)
    const parts = t.date.split('/');
    if (parts.length !== 3) return;

    // Verifica se as partes da data são números válidos
    const [day, month, year] = parts;
    // Verifica se o mês e o ano são válidos
    const key = `${month}/${year}`;

    // Agrupa as transações por mês/ano
    if (!groups[key]) {
      groups[key] = [];
    }
    // Adiciona a transação ao grupo correspondente
    groups[key].push(t);
  });

  return groups;
};

const TransactionTable = ({ transactions }: Props) => {
  const grouped = groupByMonth(transactions); //

  console.log('Props recebidas:', transactions);

  return (
    <div>
      {Object.entries(grouped).map(([monthYear, trans]: [string, Transaction[]], index: number) => {
        const totalCredit = trans
          .filter((t: Transaction) => t.type === 'credit')
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        const totalDebit = trans
          .filter((t: Transaction) => t.type === 'debit')
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

    
        return (
          <div key={index}>
            <div className="yearsH1">
              <div className="yrs">
                <h3>{monthYear}</h3>
              </div>
            </div>
            <table border={1}>
              <thead>
                <tr>
                  <th>Data</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Tipo</th>
                </tr>
              </thead>
              <tbody>
                {trans.map((t: Transaction, idx: number) => (
                  <tr key={idx}>
                    <td>{t.date}</td>
                    <td>{t.description}</td>
                    <td>{formatCurrency(t.amount)}</td>
                    <td>{t.type}</td>
                  </tr>
                ))}
                <tr className='total-media'>
                  <td colSpan={2}></td>
                  <td><strong>{formatCurrency(totalDebit)}</strong></td>
                  <td><strong>débitos</strong></td>
                </tr>
                <tr>
                  <td colSpan={2}><strong>Totais do mês:</strong></td>
                  <td><strong>{formatCurrency(totalCredit)}</strong></td>
                  <td><strong>créditos</strong></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionTable;
