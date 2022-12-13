import React, {useState} from 'react'
import './listaConteudos.css'
import FiltroBuscar from '../../filtroBuscar/FiltroBuscar';
import axios from "axios";
import AuthHeader from '../../../AuthContext';
export default function ListaConteudos() {

  const [quantidade, setQuantidade] = useState(0)
  const [conteudos, setConteudos] = useState([])

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/conteudo/filtro?nome=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}`, { headers: AuthHeader() })
    setConteudos(res.data.conteudos);
    setQuantidade(res.data.quantidade) 
 };
  
  return (
    <>
      <FiltroBuscar titulo={"Conteúdos"} opcoesFiltro={["Ordem Alfabética", "Número de Provas"]} buscarFiltrado={buscarFiltrado} objetos={conteudos} quantidade={quantidade} tipo={1}/>
    </>
  );

};
