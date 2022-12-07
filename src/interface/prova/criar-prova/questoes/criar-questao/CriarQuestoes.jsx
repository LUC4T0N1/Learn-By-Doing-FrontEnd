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

export default function CriarQuestoes(conteudosObjetos) {
  const [publica, setPublica] = useState(true);
  const [dissertativa, setDissertativa] = useState(true);

 
  const mudarPrivacidade = (e) => {
    if(e.target.value === "true"){
      setPublica(true);
    }else{
      setPublica(false)
    }
  }  

  const mudarTipoQuestao = (e) => {
    if(e.target.value === "true"){
      setDissertativa(true);
    }else{
      setDissertativa(false)
    }
  } 
  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);

  useEffect(() => {
    console.log("inicioy:" + prova)
    dispatch(setQuestao({...questao, conteudos: prova.conteudos}))
  }, [dispatch])

  const questao = useSelector((state) => state.questoes.questao);

  const handleChange = (e) => {
    console.log("inicioy:" + prova.conteudos)
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
      setOpen(false);
    }else{
      alert('preencha todos os campos');
    }
  } 

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className='criar-questoes'>
      <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
      <div className='mini-container'>
        <input type="text" name="nome-prova" className='input-texto-simples' placeholder="Enunciado..."></input>
        <select name="privacidade" id="privacidade" className='select-simples' onChange={mudarPrivacidade}>
            <option value={true}>Pública</option>
            <option value={false}>Privada</option>
        </select>
      </div>
      <div className='mini-container'>
        <BuscarSelect/>
        <select name="tipo-questao" id="tipo-questao" className='select-simples' onChange={mudarTipoQuestao}>
            <option value={true}>Dissertativa</option>
            <option value={false}>Múltipla Escolha</option>
        </select>
      </div>
      {dissertativa?
       (<>
       <textarea  type="text" name="nome-prova" className='input-texto-grande' placeholder="Resposta..."></textarea>
       </>) 
       : 
       (<>
        <div>
        {questao.alternativas.length !==0 ? (
          <div style = {{ display : "block", flexWrap : "wrap"}}>
          {questao.alternativas.map((alt) => (
    
            <h3> {questao.alternativas.findIndex(a => a ===alt)+1}) {alt.enunciado} {alt.correta ? ('correta') : ('incorreta')} </h3>
            ))}
          </div>
        ): (
           <h3> Nenhuma Alternativa Por Enquanto </h3>
            )}
            </div>
           <CriarAlternativas/>
          </>)}
      </div>
  )
}
