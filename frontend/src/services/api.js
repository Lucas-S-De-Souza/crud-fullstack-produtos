import axios from "axios";

const apiReal = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  timeout: 8000,
});

// Modo demonstração (usado no site publicado no GitHub Pages, que não tem back-end):
// os dados ficam só no navegador de quem visita. Fora disso, a API real é usada.
export const modoDemo = import.meta.env.VITE_DEMO === "true";

const CHAVE = "estoque-demo";
const exemplos = [
  { id: 1, nome: "Teclado mecânico", preco: 249.9, quantidade: 12 },
  { id: 2, nome: "Mouse sem fio", preco: 89.9, quantidade: 3 },
  { id: 3, nome: "Monitor 24 polegadas", preco: 799, quantidade: 0 },
];

function ler() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CHAVE));
    if (Array.isArray(salvo)) return salvo;
  } catch {
    // sem armazenamento disponível: usa os exemplos
  }
  return exemplos;
}

let lista = ler();

function gravar(novaLista) {
  lista = novaLista;
  try {
    localStorage.setItem(CHAVE, JSON.stringify(novaLista));
  } catch {
    // sem armazenamento: os dados valem só até recarregar a página
  }
}

const idDaUrl = (url) => Number(url.split("/").pop());

const apiDemo = {
  get: async () => ({ data: lista }),
  post: async (_url, dados) => {
    const novo = { ...dados, id: Date.now() };
    gravar([...lista, novo]);
    return { data: novo };
  },
  put: async (url, dados) => {
    const id = idDaUrl(url);
    gravar(lista.map((p) => (p.id === id ? { ...p, ...dados, id } : p)));
    return { data: { ...dados, id } };
  },
  delete: async (url) => {
    const id = idDaUrl(url);
    gravar(lista.filter((p) => p.id !== id));
    return { data: null };
  },
};

export const api = modoDemo ? apiDemo : apiReal;

// Transforma o erro do axios em uma mensagem que o usuário entende.
export function mensagemDeErro(err) {
  if (err.response) {
    const detalhe = err.response.data?.message;
    return `O servidor respondeu com erro ${err.response.status}${detalhe ? `: ${detalhe}` : ""}.`;
  }
  if (err.request) {
    return "Não foi possível falar com o servidor. Confira se o back-end está rodando em http://localhost:8080.";
  }
  return "Ocorreu um erro inesperado.";
}