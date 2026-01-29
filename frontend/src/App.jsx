import { useEffect, useState } from "react";
import ProdutoForm from "./components/ProdutoForm";
import { api } from "./services/api";

function App() {
  const [produtos, setProdutos] = useState([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null); // ESTADO NO LUGAR CERTO

  function carregar() {
    api.get("/produtos").then((res) => setProdutos(res.data));
  }

  useEffect(() => {
    carregar();
  }, []);

  function deletar(id) {
    if (window.confirm("Deseja realmente excluir este produto?")) {
      api.delete(`/produtos/${id}`).then(carregar);
    }
  }

  function prepararEdicao(produto) {
    setProdutoParaEditar(produto);
  }

  return (
    <div className="app-container">
      <header>
        <h1>📦 Estoque Pro</h1>
        <p>Gerenciamento inteligente de produtos</p>
      </header>

      <div className="card">
        <h3>{produtoParaEditar ? "Editar Produto" : "Novo Produto"}</h3>
        {/* PASSANDO AS PROPS PARA O FORMULÁRIO */}
        <ProdutoForm 
          atualizarLista={carregar} 
          produtoParaEditar={produtoParaEditar} 
          setProdutoParaEditar={setProdutoParaEditar} 
        />
      </div>

      <div className="card">
        <h3>Produtos em Estoque</h3>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Preço</th>
              <th>Qtd</th>
              <th style={{ textAlign: "right" }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.nome}</strong></td>
                <td>R$ {p.preco.toFixed(2)}</td>
                <td>{p.quantidade} un</td>
                <td style={{ textAlign: "right" }}>
                  <button
                    className="btn-edit"
                    onClick={() => prepararEdicao(p)}
                    style={{ marginRight: "10px", background: "#eab308", color: "white", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    Editar
                  </button>
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