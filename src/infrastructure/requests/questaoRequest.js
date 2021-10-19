import axios from "axios";

export function criarQuestao (body) {
  return axios.post('http://localhost:8080/api/questao', body)
}
