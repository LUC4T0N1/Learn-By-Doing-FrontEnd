import React, {useState} from 'react'
import './listaProvas.css'
import axios from "axios";
import AuthHeader from '../../AuthContext';
import FiltroBuscar from '../filtroBuscar/FiltroBuscar';
import { useDispatch } from "react-redux";
import { logout } from "../../application/autenticacaoSlice"
import { useHistory } from 'react-router-dom';

function ProvasCriadas () {

  const [quantidade, setQuantidade] = useState(0)
  const [provas, setProvas] = useState([])

  const dispatch = useDispatch();
  let history = useHistory();

  const buscarFiltrado = async (nome, busca) => {
    try{
      const res = await axios.get(`http://localhost:8080/api/prova/buscarPU?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`, { headers: AuthHeader() })
      setProvas(res.data.provas);
      setQuantidade(res.data.quantidade) 
    }catch (error){
      dispatch(logout({ ...{}}))
      history.push(`/login`)
    }
 };

  return (
    <>
    <FiltroBuscar titulo={"Provas"} opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]} buscarFiltrado={buscarFiltrado} objetos={provas} quantidade={quantidade} tipo={4}/>
  </>
  )
}

export default ProvasCriadas