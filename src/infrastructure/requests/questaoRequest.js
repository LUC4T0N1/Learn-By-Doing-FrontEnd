import axios from "axios";
import authHeader from "../../AuthContext";

const url = "http://localhost:8080/api/";

export function criarQuestao(body) {
  return axios.post(`${url}questao`, body, { headers: authHeader() });
}

export function obterQuestoes(body) {
  return axios.post(`${url}questao/filtrar`, body, { headers: authHeader() });
}
