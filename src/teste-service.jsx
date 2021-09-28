import {useEffect, useState} from 'react'
import axios from 'axios'

export const BuscarConteudosService = (pagina) => {
  const [conteudos, setConteudos] = useState();
  useEffect(() => {
    axios.get(`http://localhost:8080/api/conteudo/buscarOA?pagina=${pagina}`).then((res) => {
      const responseConteudos = res.data.conteudos;
      setConteudos(responseConteudos);
      console.log(responseConteudos);
    });
  }, []);
  return conteudos
}


export const CriarConteudoService = (conteudo) => {
  axios.post(`http://localhost:8080/api/conteudo`, conteudo).then((res) => {
    const status = res.status;
    if(status == '200'){
      alert('sucesso')
    }else{
      alert('erro')
    }
    window.location.reload();
  });
}

export const BuscarProvasService = (pagina, body) => {
  const [provas, setProvas] = useState();
  useEffect(() => {
    axios.post(`http://localhost:8080/api/prova/buscarPC?pagina=${pagina}`, body).then((res) => {
      const responseProvas = res.data.provas;
      setProvas(responseProvas);
      console.log(responseProvas);
    });
  }, []);
  return provas;
}

