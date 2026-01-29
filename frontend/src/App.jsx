import { useEffect, useState } from "react";
import ProdutoForm from "./components/ProdutoForm"; // Mudamos o nome aqui
import { api } from "./services/api";

function App() {
  const [produtos, setProdutos] = useState([]);

  function carregar() {
    api.get("/produtos").then(res => setProdutos(res.data));
  }

  useEffect(() => {
    carregar();
  }, []);

  function deletar(id) {
    if(window.confirm("Deseja realmente excluir este produto?")) {
        api.delete(`/produtos/${id}`).then(carregar);
    }
  }

 // ... mantenha seus imports e funções carregar/deletar ...

return (
  <div className="app-container">
    <header>
      <h1>📦 Estoque Pro</h1>
      <p>Gerenciamento inteligente de produtos</p>
    </header>

    <div className="card">
      <h3>Novo Produto</h3>
      <ProdutoForm atualizarLista={carregar} />
    </div>

    <div className="card">
      <h3>Produtos em Estoque</h3>
      <table>
        <thead>
          <tr>
            <th>Produto</th>
            <th>Preço</th>
            <th style={{ textAlign: 'right' }}>Ações</th>
          </tr>
        </thead>
        <tbody>
          {produtos.map(p => (
            <tr key={p.id}>
              <td><strong>{p.nome}</strong></td>
              <td>R$ {p.preco.toFixed(2)}</td>
              <td style={{ textAlign: 'right' }}>
                <button className="btn-delete" onClick={() => deletar(p.id)}>
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

}

export default App;