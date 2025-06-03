# 💰 ContAI — Controle de Transações

ContAI é uma aplicação web para gerenciamento de transações financeiras, permitindo adicionar, visualizar, filtrar e excluir lançamentos. Desenvolvido com React no frontend e Express + TypeORM no backend, utilizando banco de dados PostgreSQL.

## 🔧 Tecnologias Utilizadas
### ✅ Frontend
- React
- TypeScript
- CSS
### ✅ Backend
- Express
- TypeORM
- PostgreSQL
- 
## ⚙️ Funcionalidades
- ✅ Cadastro de transações com:
  - Data (`DD/MM/AAAA`)
  - Descrição
  - Valor (positivo)
  - Tipo: Crédito ou Débito
- ✅ Listagem agrupada por mês
- ✅ Totalizador mensal
- ✅ Exclusão de transações
- ✅ Armazenamento em banco de dados PostgreSQL

🛠️ Instruções de Execução

1️⃣ Clonar o repositório
2️⃣ Criar o banco de dados no PostgreSQL
Acesse seu terminal do PostgreSQL ou o pgAdmin e execute:
CREATE DATABASE transactions_db;
Esse nome precisa coincidir com o que está em typeorm.config.ts.
3️⃣ Rodar o backend (Express + TypeORM)
4️⃣ Rodar o frontend (React)
5️⃣ Testar a aplicação
Preencha o formulário com data, descrição, valor e tipo
Clique em "Add" para salvar
A tabela será atualizada e os dados salvos no banco
Clique no ícone
