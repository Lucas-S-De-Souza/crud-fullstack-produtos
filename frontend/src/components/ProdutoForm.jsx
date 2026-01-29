import { useState } from "react";
import { api } from "../services/api";

function ProdutoForm({ atualizarLista }) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  function salvar(e) {
    e.preventDefault();
    // Mudamos a rota para /produtos e os campos para nome e preco
    api.post("/produtos", { nome, preco: parseFloat(preco) }).then(() => {
      setNome("");
      setPreco("");
      atualizarLista();
    }).catch(err => alert("Erro ao salvar! Verifique os dados."));
  }

  return (
    <form onSubmit={salvar} className="form-container">
      <input
        placeholder="Nome do Produto"
        value={nome}
        onChange={e => setNome(e.target.value)}
        required
      />
      <input
        placeholder="Preço (Ex: 1500.00)"
        type="number"
        value={preco}
        onChange={e => setPreco(e.target.value)}
        required
      />
      <button type="submit">Cadastrar Produto</button>
    </form>
  );
}

export default ProdutoForm;