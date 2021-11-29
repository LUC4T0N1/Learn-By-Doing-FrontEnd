import axios from "axios";
import AuthHeader from '../../AuthContext';

const url = "http://localhost:8080/api/"

export function obterProvas (pagina, body) {
  return axios.post(`${url}buscarPC?pagina=${pagina}`, body, { headers: AuthHeader() })
}

export function obterProva (idProva) {
  return  axios.get(`${url}prova/buscarID?id=${idProva}`, { headers: AuthHeader() })
}

export function cadastrarNovaProva (body) {
  return axios.post(`${url}prova`, body, { headers: AuthHeader() })
}

export function realizarProva (body) {
  return axios.post(`${url}api/prova/realizar`, body, { headers: AuthHeader() })
}

export function obterProvasCriadas (pagina) {
  return axios.get(`${url}prova/buscarPU?pagina=${pagina}`, { headers: AuthHeader() })
}

export function obterProvasFeitas (id) {
  return axios.get(`${url}prova/buscarResolucoes?id=${id}`, { headers: AuthHeader() })
}

export function obterProvasRealizadas () {
  return axios.get(`${url}prova/buscarResolucoesPorUsuario`, { headers: AuthHeader() })
}

export function obterProvaFeita (id) {
  return axios.get(`${url}prova/buscarRID?id=${id}`, { headers: AuthHeader() })
}

export function corrigirProva (body) {
  return axios.put(`${url}prova/corrigirDissertativa`, body, { headers: AuthHeader() })
}
