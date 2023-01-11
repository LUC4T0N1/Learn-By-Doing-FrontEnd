import axios from "axios";
import AuthHeader from '../../AuthContext';

const url = "http://localhost:8080/api/prova"

export function obterProvasPorConteudo (pagina, nome, ordenacao, idConteudo) {
  return axios.get(`${url}/buscarPorConteudo?pagina=${pagina}&nome=${nome}&ordenacao=${ordenacao}&idConteudo=${idConteudo}`, { headers: AuthHeader() })
}

export function obterProva (idProva) {
  return  axios.get(`${url}/buscarID?id=${idProva}`, { headers: AuthHeader() })
}

export function obterProvaFazer (idProva) {
  return  axios.get(`${url}/buscarFazerID?id=${idProva}`, { headers: AuthHeader() })
}

export function obterProvaPrivada (idProva) {
  return  axios.get(`${url}/buscarPrivadaID?id=${idProva}`, { headers: AuthHeader() })
}


export function cadastrarNovaProva (body) {
  return axios.post(`${url}`, body, { headers: AuthHeader() })
}

export function realizarProva (body) {
  return axios.post(`${url}/realizar`, body, { headers: AuthHeader() })
}

export function obterProvasCriadas (pagina) {
  return axios.get(`${url}/buscarPU?pagina=${pagina}`, { headers: AuthHeader() })
}

export function obterProvasFeitas (id) {
  return axios.get(`${url}/buscarResolucoes?id=${id}`, { headers: AuthHeader() })
}

export function obterProvasRealizadas () {
  return axios.get(`${url}/buscarResolucoesPorUsuario`, { headers: AuthHeader() })
}

export function obterProvaFeita (id) {
  return axios.get(`${url}/buscarRID?id=${id}`, { headers: AuthHeader() })
}

export function corrigirProva (body) {
  return axios.put(`${url}/corrigirDissertativa`, body, { headers: AuthHeader() })
}
