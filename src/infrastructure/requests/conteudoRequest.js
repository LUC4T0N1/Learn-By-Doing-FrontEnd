import axios from "axios";

export function obterConteudos (pagina) {
  return axios.request({
    method: 'get',
    url: `http://localhost:8080/api/conteudo/buscarOA?pagina=${pagina}`
  })
}

export function criarConteudo (conteudo) {
  return axios.post(`http://localhost:8080/api/conteudo`, conteudo)
}
 
