import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import "./Questao.css"
import CriarQuestoes from './criar-questao/CriarQuestoes';
export default function AdicionarQuestoes() {
  const [open, setOpen] = useState(false);
  const [criar, setCriar] = useState(false);
  const [escolher, setEscolher] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

    const handleClose = () => {
    setOpen(false);
    /* todo enviar prop back */
  };

  const handleOpenCriar = () => {
    setOpen(false);
    setEscolher(false);
    setCriar(true);
  };

  const handleOpenEscolher = () => {
    setOpen(false);
    setEscolher(true);
    setCriar(false);
  };

  return (
    <div className='adicionar-questao'>
      <button className='botao-simples' onClick={handleClickOpen}>Adicionar Questão</button>
      {open ?
       (
        <div className='escolher-opcao'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='opcoes'>
            <button className='botao-simples' onClick={handleOpenCriar}>Criar Nova Questão</button>
            <button className='botao-simples' onClick={handleOpenEscolher}>Buscar Nova Questão</button>
          </div>
        </div>
       ) 
       :
       (<></>)
       }
        {criar ?
       (<CriarQuestoes/>) 
       :
       (<></>)
       }
    </div>
  )
}
