import React from 'react'
import './VisualizarQuestoes.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function VisualizarQuestoesCriadas({questao, resposta}) {
  return (
    <div className="visualizar-questao">
      <div className='questao-header'>
        <p className='questao-numero'>Questão {questao.numeroQuestao}</p>
        <div className='questao-dados'>
        {questao.multiplaEscolha ? <p>· Multipla Escolha</p> : <p>· Dissertativa</p>}
          {questao.publica ? <p>· Publica</p> : <p>· Privada</p>}
          {<p>· Valor: {questao.valor}</p>}
        </div>
      </div>
      <p className='visualizar-enunciado'>{questao.enunciado}</p>
      <div className='campo-resposta'>
        <p className='resposta-label'>Resposta: </p>
        {!questao.multiplaEscolha ? 
        (<div className='area-resposta'>
          <p>{questao.resposta}</p>
        </div>)
        :
        (<div className='area-resposta'>
          {questao.alternativas.map((alt) =>
              ( <p className='visualizar-alternativa'>
                {alt.correta ? 
                    (<FontAwesomeIcon icon={faCheck} className='alt-icon-verdadeiro'></FontAwesomeIcon>) 
                    :
                    (<FontAwesomeIcon icon={faXmark} className='alt-icon-falso'></FontAwesomeIcon>)}{alt.enunciado}</p> 
              ))}
        </div>)
        }
   
      </div>
    </div>
  )
}
