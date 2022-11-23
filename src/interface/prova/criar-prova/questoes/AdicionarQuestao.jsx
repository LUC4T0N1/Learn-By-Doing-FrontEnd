import React, {useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons' 
import "./Questao.css"
export default function AdicionarQuestoes() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

    const handleClose = () => {
    setOpen(false);
    /* todo enviar prop back */
  };

  return (
    <div className='adicionar-questao'>
      <button className='botao-simples' onClick={handleClickOpen}>Adicionar Questão</button>
      {open ?
       (
        <div className='escolher-opcao'>
          <button className='botao-fechar' onClick={handleClose}><i><FontAwesomeIcon icon={faX} rel="noreferrer" className='icon-fechar'></FontAwesomeIcon></i></button>
          <div className='conteudo'>
            <p>Adicionar Questão</p>
            <button className='botao-simples' onClick={handleClose}>Criar Nova Questão</button>
            <button className='botao-simples' onClick={handleClose}>Buscar Nova Questão</button>
          </div>
        </div>
       ) 
       :
       (<></>)
       }
    </div>
  )
}
