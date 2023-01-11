import React from 'react'
import "./CorrigirQuestao.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function CorrigirQuestao({questao, atualizarComentarioQuestao, atualizarNotaQuestao }) {
  return (
    <div className="visualizar-questao">
      <div className='questao-header'>
        <p className='questao-numero'>Questão {questao.numeroQuestao}</p>
        <div className='questao-dados'>
          <p>· Valor: {questao.valor}</p>
          <p>· Nota: {questao.notaAluno}</p>
        </div>
      </div>
      <p className='visualizar-enunciado'>{questao.enunciado}</p>
      <div className='campo-resposta'>
        <p className='resposta-label'>Resposta: </p>
        <div className='area-resposta'>
          {questao.multiplaEscolha ? 
                (<>
                {questao.alternativas.map((alt) =>
                    ( <p className={alt.id == questao.respostaAluno ? 'visualizar-alternativa-respondida' : 'visualizar-alternativa'}>
                      {alt.correta ? 
                          (<FontAwesomeIcon icon={faCheck} className='alt-icon-verdadeiro'></FontAwesomeIcon>) 
                          :
                          (<FontAwesomeIcon icon={faXmark} className='alt-icon-falso'></FontAwesomeIcon>)}{alt.enunciado}</p> 
                    ))}
              </>)
              :
              (<p>{questao.resposta}</p>)
        }
        </div>
        {questao.multiplaEscolha ? (<></>)
        : 
        (
        <><input placeholder='Nota' className='nota-questao' type="number" onChange={(e)=> atualizarNotaQuestao(e,questao.idQuestaoResolvida)}></input>
          <textarea placeholder='Comentário' className='comentario-questao' type="text" onChange={(e)=> atualizarComentarioQuestao(e,questao.idQuestaoResolvida)}></textarea>
          </>)}
      </div>
    </div>
  )
}
