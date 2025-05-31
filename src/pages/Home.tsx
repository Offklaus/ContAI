import React, { useState, useEffect} from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionTable from '../components/TransactionTable';
import { Transaction } from '../types/Transaction';

import './home.css';


const Home = () => {
  // Estado
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  // Estado para verificar se o localStorage foi inicializado
  const [isInitialized, setInitialized] = useState(false);

  // Estado para armazenar a busca e o filtro
  const [search, setSearch] = useState('');
  // Estado para armazenar o tipo de filtro (todos, crédito, débito)
  const [filterType, setFilterType] = useState('all');

  //carregar os dados do localStorage quando o componente for montado
  useEffect (() =>{
    const saved = localStorage.getItem('transactions');
    if (saved) {
      try {
        // indica que o saved é uma string JSON
        // e precisamos convertê-lo para um array de objetos Transaction
        const parsed = JSON.parse(saved);
        // Log para verificar se os dados foram carregados corretamente
        console.log('Carregado do localStorage:', parsed);
        // Atualiza o estado com os dados carregados
        setTransactions(parsed);
      } catch (e) {
        console.log('Erro ao carregar o JSON,', e)
      }
    }
    // Marca o localStorage como inicializado
    setInitialized(true);
  },[]);

  // Salvar os dados no localStorage sempre que o estado de transactions mudar
  useEffect(() => {
    // Verifica se o localStorage já foi inicializado
    if(isInitialized) {

      localStorage.setItem('transactions', JSON.stringify(transactions));
      console.log('Transactions saved to localStorage:', transactions);
    }
  }, [transactions]);


  const addTransaction = (transaction: Transaction) => {
    setTransactions((prev) => [...prev, transaction]);
  };

  const filtered = transactions.filter((t) => {
    const matchType = filterType === 'all' || t.type === filterType;
    const matchSearch = t.description.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

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
      <TransactionTable transactions={transactions} />
      </div>
    </div>
  );
};

export default Home;
