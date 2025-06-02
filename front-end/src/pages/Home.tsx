import React, { useState, useEffect} from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { Transaction } from '../types/Transaction';
import { fetchTransactions, createTransaction} from '../services/api';

import './home.css';


const Home = () => {
  // Estado
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // Estado para verificar se o localStorage foi inicializado
  const [isInitialized, setInitialized] = useState(false);


  useEffect (() =>{
    fetchTransactions().then(setTransactions).catch(console.error);
  },[]);

  // Salvar os dados no localStorage sempre que o estado de transactions mudar
  useEffect(() => {
    // Verifica se o localStorage já foi inicializado
    if(isInitialized) {

      localStorage.setItem('transactions', JSON.stringify(transactions));
      console.log('Transactions saved to localStorage:', transactions);
    }
  }, [transactions]);


  const addTransaction = async (transaction: Transaction) => {
    const newTx = await createTransaction(transaction);
    setTransactions((prev) => [...prev, newTx]);
  };

  // Função para deletar uma transação
  const deleteTransaction = (transaction: Transaction) => {
    setTransactions((prev) => prev.filter((t) => t !== transaction));
  };
  console.log('Transictions para tabele', transactions);


  return (
    <div className ="container">
      <div className='header'>
        <h1>ContAI</h1>
      </div>
      <div className='Tablecont'>
        <div className="formsSearch">
          <TransactionForm onAdd={addTransaction} />
        </div>
      <TransactionTable
        transactions={transactions}
        onDelete={deleteTransaction}
      />
      </div>
    </div>
  );
};

export default Home;
