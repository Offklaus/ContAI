//conectando o backend com o frontend

const API_URL ='http://localhost:3004/transactions';

// função para buscar as transações do backend
export async function fetchTransactions() {

    const res = await fetch(API_URL);
    return res.json();
}
// função para criar uma nova transação no backend
export async function createTransation(data:{
    date: string;
    description: string;
    amount: number;
    type:'credit' | 'debit';
}) {
    
    const res = await fetch(API_URL, { // método POST
        method: 'POST',
        // enviando os dados no corpo da requisição
        headers: {
            'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });
    // verificando se a resposta foi bem sucedida
    return res.json();
}

// função para excluir uma transação do backend
// conversando com o backend
// usando o método DELETE
// passando o ID da transação na URL
export async function deleteTransaction(id: number) {
    await fetch('http://localhost:3004/transactions/${id}', {
        method: 'DELETE',
    })
}