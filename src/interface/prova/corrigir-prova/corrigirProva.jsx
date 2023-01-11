import React, {useState} from 'react'
import './corrigirProva.css'
import FiltroBuscar from '../../filtroBuscar/FiltroBuscar';
import axios from "axios";
import AuthHeader from '../../../AuthContext';

function CorrigirProva () {

  const [quantidade, setQuantidade] = useState(0)
  const [provas, setProvas] = useState([])


  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(`http://localhost:8080/api/prova/buscarPU?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`, { headers: AuthHeader() })
    setProvas(res.data.provas);
    setQuantidade(res.data.quantidade) 
 };

  return (
    <>
    <FiltroBuscar titulo={"Provas"} opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]} buscarFiltrado={buscarFiltrado} objetos={provas} quantidade={quantidade} tipo={5}/>
  </>
  )
}


export default CorrigirProva