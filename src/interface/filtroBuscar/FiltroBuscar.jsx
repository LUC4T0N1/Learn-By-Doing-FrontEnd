import React, {useState, useEffect} from 'react'
import Filtro from './Filtro'
import "./FiltroBuscar.css"
import ResultadoCard from './ResultadoCard'
import TrocarPagina from './TrocarPagina'
import { useDispatch } from "react-redux";
import { filtrarConteudos } from '../../application/conteudoSlice';
import { useSelector } from "react-redux";
import axios from "axios";
import AuthHeader from '../../AuthContext';

function FiltroBuscar({titulo, opcoesFiltro}) {
  const [busca, setBusca] = useState({nome:'', pagina:0 , ordenacao: 0})
  const [quantidade, setQuantidade] = useState(0)
  const [conteudos, setConteudos] = useState([])
  console.log("conteudos:::::: " + JSON.stringify(conteudos))
  const handleChange = (e) => {
    const value = e.target.value;
    const nome = e.target.name
    setBusca({...busca, [nome]: value, pagina: 0});
    console.log("busca: " + JSON.stringify(busca))
  }  

  const mudarOrdenacao = (e) => {
    const value = e.target.value;
    setBusca({...busca, ordenacao: value});
  }

  const proximaPagina = () => {
    setBusca({...busca, pagina: busca.pagina + 1});
  }

  const paginaAnterior = () => {
    setBusca({...busca, pagina: busca.pagina - 1});
  }
  const dispatch = useDispatch();

  const buscarFiltrado = async (nome) => {
    const res = await axios.get(`http://localhost:8080/api/conteudo/filtro?nome=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}`, { headers: AuthHeader() })
    setConteudos(res.data.conteudos);
    setQuantidade(res.data.quantidade) 
 };

   useEffect(() => {
    console.log("useeffect")
      if(busca.nome!=''){
        buscarFiltrado(busca.nome)
      }else{
        buscarFiltrado(null)
      }
  }, [busca]) 

  return (
  <div className='filtro-buscar-container'>
    <div className='filtro-buscar-form'>
      <p className='busca-titulo'>Buscar {titulo}</p>
      <div className='busca-filtro'>
        <input type="text" name="nome" className='input-texto-simples' placeholder="Buscar Conteúdos..." onChange={handleChange}></input>
        <div className='opcoes-filtro'>
              {opcoesFiltro.map((opcao, index) =>
              ( <Filtro key={index} index={index} nomeFiltro={opcao} mudarOrdenacao={mudarOrdenacao}/> 
              ))}
        </div>
      </div>
      <div className='resultados'>
      {conteudos.map((conteudo, index) =>
              ( <ResultadoCard key={index} nome={conteudo.nome} dados={["Provas: " + conteudo.numeroProvas]}/> )
                    )}
      </div>
     {busca.nome==""? 
     (<TrocarPagina quantidade={quantidade} paginaAtual={busca.pagina+1} proximaPagina={proximaPagina} paginaAnterior={paginaAnterior}/> ) : 
    (<></>)}
    </div>
  </div>
  )
}

export default FiltroBuscar