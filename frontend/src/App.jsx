import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { api, mensagemDeErro } from "./services/api";
import Modal from "./components/Modal";
import ProdutoForm from "./components/ProdutoForm";

const moeda = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

function situacao(qtd) {
  if (qtd === 0) return { texto: "Sem estoque", classe: "zerado" };
  if (qtd < 5) return { texto: "Estoque baixo", classe: "baixo" };
  return { texto: "Em estoque", classe: "ok" };
}

export default function App() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroLista, setErroLista] = useState("");
  const [busca, setBusca] = useState("");

  const [formAberto, setFormAberto] = useState(false);
  const [emEdicao, setEmEdicao] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [erroForm, setErroForm] = useState("");

  const [paraExcluir, setParaExcluir] = useState(null);
  const [aviso, setAviso] = useState(null);
  const timer = useRef(null);

  const carregar = useCallback(async () => {
    try {
      const { data } = await api.get("/produtos");
      setProdutos(data);
      setErroLista("");
    } catch (err) {
      setErroLista(mensagemDeErro(err));
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregar();
  }, [carregar]);

  function avisar(tipo, texto) {
    clearTimeout(timer.current);
    setAviso({ tipo, texto });
    timer.current = setTimeout(() => setAviso(null), 4000);
  }

  function abrirForm(produto = null) {
    setEmEdicao(produto);
    setErroForm("");
    setFormAberto(true);
  }

  function fecharForm() {
    setFormAberto(false);
    setEmEdicao(null);
  }

  async function salvar(dados) {
    setSalvando(true);
    setErroForm("");
    try {
      if (emEdicao) {
        await api.put(`/produtos/${emEdicao.id}`, dados);
        avisar("sucesso", "Produto atualizado.");
      } else {
        await api.post("/produtos", dados);
        avisar("sucesso", "Produto cadastrado.");
      }
      fecharForm();
      await carregar();
    } catch (err) {
      setErroForm(mensagemDeErro(err));
    } finally {
      setSalvando(false);
    }
  }

  async function excluir() {
    const alvo = paraExcluir;
    setParaExcluir(null);
    try {
      await api.delete(`/produtos/${alvo.id}`);
      avisar("sucesso", `"${alvo.nome}" foi excluído.`);
      await carregar();
    } catch (err) {
      avisar("erro", mensagemDeErro(err));
    }
  }

  const filtrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();
    return produtos.filter((p) => p.nome.toLowerCase().includes(termo));
  }, [produtos, busca]);

  const totalItens = produtos.reduce((soma, p) => soma + (p.quantidade ?? 0), 0);
  const valorTotal = produtos.reduce((soma, p) => soma + (p.preco ?? 0) * (p.quantidade ?? 0), 0);

  return (
    <div className="app">
      <header className="topo">
        <div>
          <h1>Estoque</h1>
          <p>Gerencie produtos, preços e quantidades.</p>
        </div>
        <button className="btn btn-primario" onClick={() => abrirForm()}>+ Novo produto</button>
      </header>

      <section className="resumo" aria-label="Resumo do estoque">
        <div className="stat"><span>Produtos</span><strong>{produtos.length}</strong></div>
        <div className="stat"><span>Itens em estoque</span><strong>{totalItens}</strong></div>
        <div className="stat"><span>Valor em estoque</span><strong>{moeda.format(valorTotal)}</strong></div>
      </section>

      <section className="painel">
        <div className="barra">
          <input
            type="search" placeholder="Buscar produto..." aria-label="Buscar produto"
            value={busca} onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {carregando && <p className="vazio">Carregando produtos...</p>}

        {!carregando && erroLista && (
          <div className="vazio" role="alert">
            <p>{erroLista}</p>
            <button className="btn btn-ghost" onClick={() => { setCarregando(true); carregar(); }}>
              Tentar novamente
            </button>
          </div>
        )}

        {!carregando && !erroLista && produtos.length === 0 && (
          <div className="vazio">
            <p>Nenhum produto cadastrado ainda.</p>
            <button className="btn btn-primario" onClick={() => abrirForm()}>Cadastrar o primeiro</button>
          </div>
        )}

        {!carregando && !erroLista && produtos.length > 0 && filtrados.length === 0 && (
          <p className="vazio">Nenhum produto encontrado para "{busca}".</p>
        )}

        {filtrados.length > 0 && (
          <table className="tabela">
            <thead>
              <tr>
                <th>Produto</th>
                <th className="num">Preço</th>
                <th className="num">Qtd.</th>
                <th>Situação</th>
                <th><span className="sr-only">Ações</span></th>
              </tr>
            </thead>
            <tbody>
              {filtrados.map((p) => {
                const s = situacao(p.quantidade ?? 0);
                return (
                  <tr key={p.id}>
                    <td data-label="Produto"><strong>{p.nome}</strong></td>
                    <td data-label="Preço" className="num">{moeda.format(p.preco ?? 0)}</td>
                    <td data-label="Quantidade" className="num">{p.quantidade ?? 0}</td>
                    <td data-label="Situação"><span className={`selo ${s.classe}`}>{s.texto}</span></td>
                    <td className="linha-acoes">
                      <button className="btn btn-ghost" onClick={() => abrirForm(p)} aria-label={`Editar ${p.nome}`}>Editar</button>
                      <button className="btn btn-perigo" onClick={() => setParaExcluir(p)} aria-label={`Excluir ${p.nome}`}>Excluir</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </section>

      <Modal aberto={formAberto} titulo={emEdicao ? "Editar produto" : "Novo produto"} onFechar={fecharForm}>
        <ProdutoForm
          key={emEdicao?.id ?? "novo"}
          inicial={emEdicao}
          salvando={salvando}
          erro={erroForm}
          onSalvar={salvar}
          onCancelar={fecharForm}
        />
      </Modal>

      <Modal aberto={paraExcluir !== null} titulo="Excluir produto" onFechar={() => setParaExcluir(null)}>
        <p>Deseja realmente excluir <strong>{paraExcluir?.nome}</strong>? Essa ação não pode ser desfeita.</p>
        <div className="acoes">
          <button className="btn btn-ghost" onClick={() => setParaExcluir(null)}>Cancelar</button>
          <button className="btn btn-perigo-cheio" onClick={excluir}>Excluir</button>
        </div>
      </Modal>

      {aviso && <div className={`aviso ${aviso.tipo}`} role="status">{aviso.texto}</div>}
    </div>
  );
}