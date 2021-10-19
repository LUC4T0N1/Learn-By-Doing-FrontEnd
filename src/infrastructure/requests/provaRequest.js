import axios from "axios";

export function obterProvas (pagina, body) {
  return axios.post(`http://localhost:8080/api/prova/buscarPC?pagina=${pagina}`, body)
}

export function obterProva (idProva) {
  return  axios.get(`http://localhost:8080/api/prova/buscarID?id=${idProva}`)
}

export function cadastrarNovaProva (body) {
  return axios.post('http://localhost:8080/api/prova', body)
}
