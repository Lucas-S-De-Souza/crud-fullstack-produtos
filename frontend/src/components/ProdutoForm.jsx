import { useState } from "react";

// O estado inicial vem de "inicial". O pai usa "key" para recriar o formulário
// a cada produto, então não precisa de useEffect para preencher os campos.
export default function ProdutoForm({ inicial, salvando, erro, onSalvar, onCancelar }) {
  const [nome, setNome] = useState(inicial?.nome ?? "");
  const [preco, setPreco] = useState(inicial?.preco ?? "");
  const [quantidade, setQuantidade] = useState(inicial?.quantidade ?? "");

  function enviar(e) {
    e.preventDefault();
    onSalvar({
      nome: nome.trim(),
      preco: Math.round(Number(preco) * 100) / 100,
      quantidade: parseInt(quantidade, 10),
    });
  }

  return (
    <form onSubmit={enviar} className="form">
      <label>
        Nome do produto
        <input value={nome} onChange={(e) => setNome(e.target.value)} maxLength={120} required autoFocus />
      </label>

      <div className="linha">
        <label>
          Preço (R$)
          <input
            type="number" min="0" step="any" inputMode="decimal"
            value={preco} onChange={(e) => setPreco(e.target.value)} required
          />
        </label>
        <label>
          Quantidade
          <input
            type="number" min="0" step="1" inputMode="numeric"
            value={quantidade} onChange={(e) => setQuantidade(e.target.value)} required
          />
        </label>
      </div>

      {erro && <p className="erro" role="alert">{erro}</p>}

      <div className="acoes">
        <button type="button" className="btn btn-ghost" onClick={onCancelar}>Cancelar</button>
        <button type="submit" className="btn btn-primario" disabled={salvando}>
          {salvando ? "Salvando..." : inicial ? "Salvar alterações" : "Cadastrar produto"}
        </button>
      </div>
    </form>
  );
}