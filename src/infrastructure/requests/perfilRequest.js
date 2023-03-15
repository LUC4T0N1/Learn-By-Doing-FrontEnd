import axios from "axios";
import AuthHeader from "../../AuthContext";

const url = process.env.REACT_APP_SERVER_URL;

export function buscarUsuario() {
  return axios.get(`${url}usuario`, { headers: AuthHeader() });
}
