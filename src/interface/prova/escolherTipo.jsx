import React from 'react'
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock, faLock} from '@fortawesome/free-solid-svg-icons' 
import "./escolherTipo.css";

const EscolherTipo = () =>{
  return(
    <div className='escolher-tipo'>
      <h1 className='escolher-titulo'>Escolha uma Das Opções</h1>
      <div className='items-container'>
          <Link className='item' to="/escolherProvaPrivada">
            <div className='item-title'>Prova Privada
            <i><FontAwesomeIcon icon={faLock} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
            </div>
            <div className='item-desc'>Resolver uma prova privada a partir de um ID único e secreto</div>
          </Link>
          <Link className='item' to="/buscar-conteudos">
            <div className='item-title'>Prova Pública
            <i><FontAwesomeIcon icon={faUnlock} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
            </div>
            <div className='item-desc'>Escolher uma prova pública por conteúdo, tamanho ou popularidade</div>
          </Link>
      </div>
    </div>
  )
}

export default EscolherTipo;
