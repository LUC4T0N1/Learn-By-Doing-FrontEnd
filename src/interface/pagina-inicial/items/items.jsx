import React from 'react'
import { Link } from "react-router-dom";
import "./items.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload, faPlus, faPenFancy, faHistory} from '@fortawesome/free-solid-svg-icons' 
function Items() {
  return (
    <div className='items-container'>
        <Link className='item' to="/tipo-de-prova">
          <div className='item-title'>Resolver Prova
          <i><FontAwesomeIcon icon={faFileUpload} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
          </div>
          <div className='item-desc'>Busque por provas públicas ou privadas, filtrando por conteúdo, tamanho e popularidade.
            Todas as provas públicas podem ser realizadas inúmeras vezes com o gabarito instantâneo</div>
        </Link>
        <Link className='item' to="/criar">
          <div className='item-title'>Criar Prova
          <i><FontAwesomeIcon icon={faPlus} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
          </div>
          <div className='item-desc'>Crie provas públicas para que todos possam resolver, ou crie uma prova privada.
            Utilize questões públicas feitas por outras pessoas ou crie suas próprias questões</div>
        </Link>
        <Link className='item' to="/corrigir/buscarProva">
          <div className='item-title'>Corrigir Prova
          <i><FontAwesomeIcon icon={faPenFancy} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
          </div>
          <div className='item-desc'>Corrija suas provas resolvidas por outras pessoas. Questões de múltipla-escolha são corrigidas automáticamente.
            Faça um comentário sobre cada questão dissertativa corrigida </div>
        </Link>
        <Link className='item' to="/historico">
          <div className='item-title'>Histórico
          <i><FontAwesomeIcon icon={faHistory} rel="noreferrer" className='icon'></FontAwesomeIcon></i>
          </div>
          <div className='item-desc'>Veja todas as provas ja criadas e resolvidas por você. Acompanhe seu progresso e suas notas. Veja as correções dos professores para suas provas realizadas.</div>
        </Link>
    </div>
  )
}

export default Items