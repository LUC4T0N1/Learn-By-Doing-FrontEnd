import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import Filtro from './Filtro';
import AscDesc from './AscDesc';
import ResultadoCard from './ResultadoCard';
import TrocarPagina from './TrocarPagina';
import ResultadoCardConteudo from './ResultadoCardConteudo';


export default function FiltroConteudos({handleClose, titulo, opcoesFiltro, buscarFiltrado, quantidade, objetos, tipo, adicionarConteudosProva}) {


  const [busca, setBusca] = useState({nome:'', pagina:0 , ordenacao: 0, ordem: 0})
  const [clicado, setClicado] = useState(false)
  const [conteudosSelecionados, setConteudosSelecionados] = useState([])

  const handleChange = (e) => {
    const value = e.target.value;
    const nome = e.target.name
    setBusca({...busca, [nome]: value, pagina: 0});
  }  

  const mudarOrdenacao = (e) => {
    const value = e.target.value;
    setBusca({...busca, ordenacao: value});
  }

  const ascendente = () => {
    setBusca({...busca, ordem: 0});
  }

  const descendente = () => {
    setBusca({...busca, ordem: 1});
  }

  const proximaPagina = () => {
    setBusca({...busca, pagina: busca.pagina + 1});
  }

  const paginaAnterior = () => {
    setBusca({...busca, pagina: busca.pagina - 1});
  }

  const addConteudo = (nome, id) => {
    console.log("cont: " + nome)
    setConteudosSelecionados(conteudosSelecionados.concat(nome));
    adicionarConteudosProva(id)
  }




   useEffect(() => {
      if(busca.nome!=''){
        buscarFiltrado(busca.nome, busca)
      }else{
        buscarFiltrado(null, busca)
      }
  }, [busca]) 

  return (
    <div className='escolher-conteudo'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='filtro-buscar-container'>
        <div className='filtro-buscar-form'>
          <p className='busca-titulo'>Buscar {titulo}</p>
          <div className='busca-filtro'>
            <input type="text" name="nome" className='input-texto-simples' placeholder={"Buscar " + titulo} onChange={handleChange}></input>
            <div className='filtros-container'>
                <div className='opcoes-filtro'>
                  {opcoesFiltro.map((opcao, index) =>
                  (<Filtro key={index} index={index} nomeFiltro={opcao} mudarOrdenacao={mudarOrdenacao}/>
                  ))}
                </div>
                  <AscDesc ordem={busca.ordem} ascendente={ascendente} descendente={descendente}/>
            </div>
          </div>
          <div className={tipo==1?'resultados' : 'resultados-provas'}>
          <div className='conteudos-selecionados'>
              {conteudosSelecionados.map((c) =>
                <p>{c}</p>
              )}
            </div>
          {objetos.map((objeto, index) =>
                  (tipo==1 ? 
                    (<ResultadoCardConteudo addConteudo={addConteudo} key={index} tipo={tipo} nome={objeto.nome} idObjeto={objeto.idConteudo}   dados={["Provas: " + objeto.numeroProvas]}/>) 
                    :
                  (<ResultadoCardConteudo addConteudo={addConteudo} key={index} tipo={tipo} nome={objeto.nome} idObjeto={objeto.id} dados={["Questoes: " + objeto.quantidadeQuestoes, "Realizações: " + objeto.popularidade]}/>) )
                  )}
          </div>
        {busca.nome==""? 
        (<TrocarPagina quantidade={quantidade} paginaAtual={busca.pagina+1} proximaPagina={proximaPagina} paginaAnterior={paginaAnterior}/> ) : 
        (<></>)}
        </div>
      </div>
    </div>
  )
}
