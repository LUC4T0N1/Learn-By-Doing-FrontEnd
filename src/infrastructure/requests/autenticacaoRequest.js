import axios from "axios";

const url = "http://localhost:8080/api/";

export function logar(login) {
  return axios.post(`${url}usuario/login`, login);
}
