import axios from "axios";
import AuthHeader from '../../AuthContext';

const url = "http://localhost:8080/api/"

export function cadastrarNovoUsuario(body) {
  return axios.post(`${url}usuario`, body, { headers: AuthHeader() })
}

export function buscarUsuario () {
  return axios.get(`${url}usuario`, { headers: AuthHeader() })
}

