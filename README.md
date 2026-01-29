# 📦 Estoque Pro - Fullstack CRUD

Este é um sistema de gerenciamento de estoque completo, desenvolvido para demonstrar habilidades em integração entre um backend robusto em **Spring Boot** e um frontend moderno e reativo em **React**.

---

## 🚀 Tecnologias Utilizadas

### **Backend**
* **Java 17**
* **Spring Boot 3**
* **Spring Data JPA**: Para persistência de dados.
* **H2 Database**: Banco de dados em memória para testes rápidos.
* **Bean Validation**: Garantia de integridade dos dados (ex: preços não negativos).
* **Swagger (OpenAPI)**: Documentação interativa da API.

### **Frontend**
* **React** (com Vite)
* **Axios**: Para consumo da API REST.
* **CSS Moderno**: Interface limpa e responsiva focada em experiência do usuário (UX).

---

## 🛠️ Como Executar o Projeto

### 1. Pré-requisitos
* Java 17 ou superior instalado.
* Node.js instalado.
* Maven instalado (ou usar o wrapper do projeto).

### 2. Rodando o Backend
1. Entre na pasta `backend`:
   ```bash
   cd backend

2.Execute a aplicação:
Bash
mvn spring-boot:run
O servidor estará rodando em http://localhost:8080.

Acesse a documentação da API em: http://localhost:8080/swagger-ui/index.html

3. Rodando o Frontend
Em outro terminal, entre na pasta frontend:

Bash
cd frontend
Instale as dependências:

Bash
npm install
Inicie o projeto:

Bash
npm run dev
Acesse no seu navegador: http://localhost:5173

📌 Funcionalidades
[x] Cadastro de produtos com validação.

[x] Listagem em tempo real de itens em estoque.

[x] Atualização de preços e nomes.

[x] Exclusão de itens com confirmação.

[x] Interface totalmente responsiva.

✒️ Autor
Desenvolvido por Lucas Santana - 