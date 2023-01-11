import React, {useState} from 'react'
import './listaProvas.css'
import axios from "axios";
import AuthHeader from '../../AuthContext';
import FiltroBuscar from '../filtroBuscar/FiltroBuscar';

function ProvasResolvidas () {
  const [quantidade, setQuantidade] = useState(0)
  const [provas, setProvas] = useState([])


  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/prova/buscarResolucoesPorUsuario?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`, { headers: AuthHeader() })
    setProvas(res.data);
    setQuantidade(res.data.length); 
 };

  return (
    <>
    <FiltroBuscar titulo={"Provas"} opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]} buscarFiltrado={buscarFiltrado} objetos={provas} quantidade={quantidade} tipo={3}/>
  </>
  )
}

export default ProvasResolvidas