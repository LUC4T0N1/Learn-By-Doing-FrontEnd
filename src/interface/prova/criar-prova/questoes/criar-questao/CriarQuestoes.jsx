import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from "react-redux";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { cadastrarNovaQuestao, setConteudosQuestao, setQuestao } from '../../../../../application/questaoSlice';
import "./CriarQuestoes.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import BuscarSelect from '../../../../filtroBuscar/BuscarSelect';
import CriarAlternativa from '../../questao/alternativa/criarAlternativa';
import CriarAlternativas from './criar-alternativas/CriarAlternativas';
import BuscarConteudos from '../../buscar-conteudos/BuscarConteudos';

export default function CriarQuestoes({handleClose}) {
  const [publica, setPublica] = useState(true);
  const [dissertativa, setDissertativa] = useState(true);

 
  const mudarPrivacidade = (e) => {
    if(e.target.value === "true"){
      setPublica(true);
    }else{
      setPublica(false)
    }
    handleChange(e);
  }  

  const mudarTipoQuestao = (e) => {
    if(e.target.value === "true"){
      setDissertativa(false);
    }else{
      setDissertativa(true)
    }
    handleChange(e);
  } 
  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);

  const handleAdicionarAlternativa = (alt) => {
    console.log("aquii")
     dispatch(setQuestao({...questao, alternativas: questao.alternativas.concat(alt)})); 
  }

  useEffect(() => {
    console.log("inicioy:" + prova)
    dispatch(setQuestao({...questao, conteudos: prova.conteudos}))
  }, [dispatch])

  const questao = useSelector((state) => state.questoes.questao);

  const handleChange = (e) => {
    console.log("enunciado questao:" + e.value + " nome: " + e.name)
    const nome = e.target.name;
    console.log(nome)
    const value = e.target.value;
    dispatch(setQuestao({...questao, [nome]: value}));
  }  

  const handleSubmit = (e) => {
    e.preventDefault();
    if(questao.enunciado){
      dispatch(cadastrarNovaQuestao({questao: questao, prova: prova}))
      dispatch(setQuestao({...questao,  enunciado: "", multiplaEscolha: false, resposta: "", valor: 0, alternativas: [] }));   
      handleClose()
     }else{
      alert('preencha todos os campos');
    }
  } 

  const adicionarConteudosQuestao = (id) => {
    var selecionado = questao.conteudos.filter(cont => cont == id);
    console.log("selecionado: " + JSON.stringify(selecionado))
    console.log("tamanho porra: " + selecionado.length)
    if(selecionado.length == 0){
      dispatch(setQuestao({...questao, conteudos: questao.conteudos.concat(id)}));
    }else{
      dispatch(setQuestao({...questao, conteudos: questao.conteudos.filter(cont => cont != id)}));
    }
  }


  return (
    <div className='criar-questoes'>
      <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
      <div className='mini-container'>
        <input type="text" name="enunciado" className='input-texto-simples' placeholder="Enunciado..." onChange={handleChange}></input>
        <select name="publica" id="privacidade" className='select-simples' onChange={mudarPrivacidade}>
            <option value={true}>Pública</option>
            <option value={false}>Privada</option>
        </select>
      </div>
      <div className='mini-container'>
        <BuscarConteudos adicionarConteudos={adicionarConteudosQuestao}/>
      </div>
      <div className='mini-container'>
        <input type="number" name="valor" className='input-numero-simples' placeholder="Valor..." onChange={handleChange}></input>
        <select name="multiplaEscolha" id="tipo-questao" className='select-simples' onChange={mudarTipoQuestao}>
            <option value={false}>Dissertativa</option>
            <option value={true}>Múltipla Escolha</option>
        </select>
      </div>
      {dissertativa?
       (<>
       <textarea  type="text" name="resposta" className='input-texto-grande' placeholder="Resposta..." onChange={handleChange}></textarea>
       </>) 
       : 
       (<>
        <div>
        {questao.alternativas.length !==0 ? (
          <div style = {{ display : "block", flexWrap : "wrap"}}>
          {questao.alternativas.map((alt) => (
    
            <h3> {questao.alternativas.findIndex(a => a ===alt)+1}) {alt.enunciado} {alt.correta ? ('incorreta') : ('correta')} </h3>
            ))}
          </div>
        ): (
           <h3> Nenhuma Alternativa Por Enquanto </h3>
            )}
            </div>
           <CriarAlternativas handleAdicionarAlternativa={handleAdicionarAlternativa} />
          </>)}
          <button className='botao-simples' onClick={handleSubmit}>Criar Questão</button>
      </div>
  )
}
