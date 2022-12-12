import axios from "axios";
import authHeader from '../../AuthContext';

const url = "http://localhost:8080/api/"

export function logar(login) {
  return axios.post(`${url}usuario/login`, login)
}


 
