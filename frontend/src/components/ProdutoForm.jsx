import { useState, useEffect } from "react"; // IMPORTAR O USEEFFECT
import { api } from "../services/api";

// RECEBER AS PROPS CORRETAMENTE
function ProdutoForm({
  atualizarLista,
  produtoParaEditar,
  setProdutoParaEditar,
}) {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");

  useEffect(() => {
    if (produtoParaEditar) {
      setNome(produtoParaEditar.nome);
      setPreco(produtoParaEditar.preco);
      setQuantidade(produtoParaEditar.quantidade);
    }
  }, [produtoParaEditar]);

  function salvar(e) {
    e.preventDefault();
    const dados = { nome, preco, quantidade: parseInt(quantidade) };

    if (produtoParaEditar) {
      // MODO EDIÇÃO (PUT)
      api
        .put(`/produtos/${produtoParaEditar.id}`, dados)
        .then(() => {
          console.log("Editado com sucesso!");
          setProdutoParaEditar(null); // Sai do modo edição
          limparECarregar(); // Limpa campos e CHAMA O GET NOVAMENTE
        })
        .catch((err) => console.error("Erro ao editar:", err));
    } else {
      // MODO CRIAÇÃO (POST)
      api
        .post("/produtos", dados)
        .then(() => {
          limparECarregar();
        })
        .catch((err) => console.error("Erro ao salvar:", err));
    }
  }

  function limparECarregar() {
    setNome("");
    setPreco("");
    setQuantidade("");
    atualizarLista();
  }

  return (
    <form onSubmit={salvar} className="form-container">
      <input
        placeholder="Nome do Produto"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        required
      />
      <input
        placeholder="Preço"
        type="number"
        step="0.01"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
        required
      />
      <input
        placeholder="Quantidade"
        type="number"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
        required
      />
      <button
        type="submit"
        style={{
          background: produtoParaEditar ? "#eab308" : "#6366f1",
          color: "white",
        }}
      >
        {produtoParaEditar ? "Salvar Alterações" : "Cadastrar Produto"}
      </button>

      {produtoParaEditar && (
        <button
          type="button"
          onClick={() => {
            setProdutoParaEditar(null);
            setNome("");
            setPreco("");
          }}
          style={{ background: "#64748b", marginLeft: "10px", color: "white" }}
        >
          Cancelar
        </button>
      )}
    </form>
  );
}

export default ProdutoForm;
