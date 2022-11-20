import axios from "axios";
import authHeader from '../../AuthContext';

const url = "http://localhost:8080/api/"

export function obterConteudos (pagina) {
  return axios.get(`${url}conteudo/buscarOA?pagina=${pagina}`, { headers: authHeader() })
}

export function criarConteudo (conteudo) {
  return axios.post(`${url}conteudo`, conteudo, { headers: authHeader() })
}

export function filtrarConteudos (nome, pagina, ordenacao) {
  return axios.get(`${url}conteudo/filtro?nome=${nome}&pagina=${pagina}&ordenacao=${ordenacao}`, { headers: authHeader() })
}
 
 
