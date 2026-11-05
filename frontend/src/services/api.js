import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:8080",
  timeout: 8000,
});

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