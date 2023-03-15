import axios from "axios";
import authHeader from "../../AuthContext";

const url = process.env.REACT_APP_SERVER_URL;

export function criarQuestao(body) {
  return axios.post(`${url}questao`, body, { headers: authHeader() });
}

export function obterQuestoes(body) {
  return axios.post(`${url}questao/filtrar`, body, { headers: authHeader() });
}
