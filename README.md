# 📦 Estoque Produto - Fullstack CRUD

Este é um sistema de gerenciamento de estoque completo, desenvolvido para demonstrar habilidades em integração entre um backend robusto em **Spring Boot** e um frontend moderno e reativo em **React**.

> **Status:** em desenvolvimento.

🔗 **Demonstração online:** https://lucas-s-de-souza.github.io/crud-fullstack-produtos/
_(modo demonstração: roda só o front-end, sem a API em Java; os dados ficam salvos no seu navegador)_

---

## 🚀 Tecnologias Utilizadas

### **Backend**

- **Java 17**
- **Spring Boot 3**
- **Spring Data JPA**: Para persistência de dados.
- **H2 Database**: Banco de dados em memória para testes rápidos.
- **Bean Validation**: Garantia de integridade dos dados (ex: nome obrigatório, preço e quantidade não negativos).
- **Swagger (OpenAPI)**: Documentação interativa da API.

### **Frontend**

- **React** (com Vite)
- **Axios**: Para consumo da API REST.
- **CSS Moderno**: Interface limpa e responsiva, com tema claro e escuro automático.

---

## 🛠️ Como Executar o Projeto

### 1. Pré-requisitos

- Java 17 ou superior instalado.
- Node.js instalado.
- Maven instalado.

### 2. Rodando o Backend

Entre na pasta `backend` e execute a aplicação:

```bash
cd backend
mvn spring-boot:run
```

O servidor estará rodando em http://localhost:8080.

Acesse a documentação da API em: http://localhost:8080/swagger-ui/index.html

### 3. Rodando o Frontend

Em outro terminal, entre na pasta `frontend`, instale as dependências e inicie o projeto:

```bash
cd frontend
npm install
npm run dev
```

Acesse no seu navegador: http://localhost:5173

> Os dados ficam em memória (H2): ao reiniciar o backend, os produtos cadastrados são apagados.

---

## 📌 Funcionalidades

- [x] Cadastro de produtos com validação.
- [x] Listagem dos produtos em estoque, com busca por nome.
- [x] Edição de nome, preço e quantidade.
- [x] Exclusão de itens com confirmação.
- [x] Resumo do estoque (total de produtos, itens e valor).
- [x] Interface responsiva.
- [ ] Persistência em banco de dados real (hoje os dados somem ao reiniciar o backend).

---

Desenvolvido por Lucas Santana
