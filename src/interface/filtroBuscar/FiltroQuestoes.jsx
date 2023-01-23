import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import Filtro from './Filtro';
import AscDesc from './AscDesc';
import ResultadoCard from './ResultadoCard';
import TrocarPagina from './TrocarPagina';
import ResultadoCardConteudo from './ResultadoCardConteudo';
import Tag from './Tag';
import BuscarConteudos from '../prova/criar-prova/buscar-conteudos/BuscarConteudos';
import VisualizarQuestoesCriadas from '../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoesCriadas';
import "./FiltrarQuestao.css"
import ResultadoQuestao from './ResultadoQuestao';

export default function FiltroQuestoes({handleClose, opcoesFiltro, buscarFiltrado, quantidade, objetos, tipo, conteudosSelecionados}) {


  const [busca, setBusca] = useState({nome:'', pagina:0 , ordenacao: 0, ordem: 0, tipo: 0, publica: true, conteudos: [],
    multiplaEscolha: true, dissertativa: true})

  const adicionarConteudosFiltro = (id) => {
    console.log("id: " + id)
    var selecionado = busca.conteudos.filter(cont => cont == id);
    console.log("selecionado: " + JSON.stringify(selecionado))
    console.log("tamanho porra: " + selecionado.length)
    if(selecionado.length == 0){
      setBusca({...busca, conteudos: busca.conteudos.concat(id)});
    }else{
      setBusca({...busca, conteudos: busca.conteudos.filter(cont => cont != id)});
    }
  }

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


   useEffect(() => {
      if(busca.nome!=''){
        buscarFiltrado(busca.nome, busca)
      }else{
        buscarFiltrado(null, busca)
      }
  }, [busca]) 

  const mudarPublica = (e) => {
      const value = e.target.value;
      setBusca({...busca, publica:value})
  }

  const mudarTipo = (e) => {
    const nome = e.target.name;
    if(nome=="opcao-filtro-ME"){
      if(busca.multiplaEscolha == true){
        console.log("11111111111111")
          setBusca({...busca, tipo:2, multiplaEscolha:false})
      }else{
        console.log("222222222")
          setBusca({...busca, tipo:0, multiplaEscolha:true})
      }
    }else{
      if(busca.dissertativa == true){
        console.log("44444444444444")
        setBusca({...busca, tipo:1, dissertativa:false})
      }else{
        console.log("5555555555555")
          setBusca({...busca, tipo:0, dissertativa:true})
      } 
    }
}

  return (
    <div className='escolher-questao'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='filtro-buscar-container'>
        <div className='filtro-buscar-form'>
          <p className='busca-titulo'>Buscar Questão</p>
          <div className='busca-filtro-questao'>
            <input type="text" name="nome" className='input-texto-simples' placeholder={"Buscar Questão"} onChange={handleChange}></input>
            <div className='filtros-container'>

                <div className='opcoes-filtro-questao'>
                  <div className='opcao'>
                    <input className='filtro-opcao' type="radio"  name="opcao-filtro-q" value={true} 
                      defaultChecked onChange={mudarPublica}/>
                    <label>Questões Públicas</label>
                  </div>
                  <div className='opcao'>
                    <input className='filtro-opcao' type="radio"  name="opcao-filtro-q" value={false} 
                      onChange={mudarPublica}/>
                    <label>Suas Questões</label>
                  </div>
                  </div>
                  <div className='opcoes-filtro-questao'>
                    <div className='opcao'>
                      {busca.dissertativa==true? 
                      (<>
                        <input defaultChecked className='filtro-opcao' type="checkbox"  name="opcao-filtro-ME"
                        onChange={mudarTipo}/>
                      <label>Multipla Escolha</label>
                      </>)
                      :
                      (<>
                        <input disabled="disabled" checked="checked" className='filtro-opcao' type="checkbox"  name="opcao-filtro-ME"/>
                      <label>Multipla Escolha</label>
                      </>)}
                    </div>
                    {busca.multiplaEscolha==true?
                    (<>
                      <div className='opcao'>
                      <input defaultChecked className='filtro-opcao' type="checkbox"  name="opcao-filtro-D"  
                        onChange={mudarTipo}/>
                      <label>Dissertativa</label>
                    </div>
                    </>)
                    :
                    (<>
                      <div className='opcao'>
                      <input disabled="disabled" checked="checked" className='filtro-opcao' type="checkbox"  name="opcao-filtro-D"/>
                      <label>Dissertativa</label>
                    </div>
                    </>)}
             
                  </div>
                <div className='opcoes-filtro-questao'>
                  {opcoesFiltro.map((opcao, index) =>
                  (<Filtro key={index} index={index} nomeFiltro={opcao} mudarOrdenacao={mudarOrdenacao}/>
                  ))}
                </div>
                  <AscDesc ordem={busca.ordem} ascendente={ascendente} descendente={descendente}/>
            </div>
          </div>
          <div className={'resultados-questoes'}>
          <BuscarConteudos adicionarConteudos={adicionarConteudosFiltro}/>
{/*           <div className='conteudos-selecionados'>
              {conteudosSelecionados.map((c) =>
                <Tag id={c.id} nome={c.nome} handleRemove={addConteudo}/>
              )}
          </div> */}
          {objetos.map((objeto, index) =>
                (<ResultadoQuestao key={index} questao={{numeroQuestao: index+1, enunciado: objeto.enunciado, publica: objeto.publica, multiplaEscolha: objeto.multiplaEscolha, id: objeto.id, valor: objeto.valor, resposta: objeto.resposta, alternativas: objeto.alternativas}} handleClose={handleClose} />) 
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
