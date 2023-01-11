import React, { useState} from 'react'
import './listaProvas.css'
import FiltroBuscar from '../../filtroBuscar/FiltroBuscar';
import axios from "axios";
import AuthHeader from '../../../AuthContext';
import { useLocation } from 'react-router-dom';

function ListaDeProvas() {

  const [quantidade, setQuantidade] = useState(0)
  const [provas, setProvas] = useState([])
  const location = useLocation();
  const idConteudo = location.state.idConteudo;

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/prova/buscarPorConteudo?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&idConteudo=${idConteudo}&ordem=${busca.ordem}`, { headers: AuthHeader() })
    setProvas(res.data.provas);
    setQuantidade(res.data.quantidade) 
 };

  return (
    <>
    <FiltroBuscar titulo={"Provas"} opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]} buscarFiltrado={buscarFiltrado} objetos={provas} quantidade={quantidade} tipo={2}/>
  </>
  )
}

export default ListaDeProvas
