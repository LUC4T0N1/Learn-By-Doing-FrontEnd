import React from 'react'

function ResponderQuestao({questao, atualizarRespostaQuestao}) {
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
         <textarea  type="text" name="resposta" className='input-texto-grande' placeholder="Resposta..." 
         onChange={(e)=> atualizarRespostaQuestao(e,questao.id)}></textarea>
        </div>)
        :
        (<div className='area-resposta'>
          {questao.alternativas.map((alt) =>
                    (<div>
                      <input className='filtro-opcao' type="radio" name="opcao-filtro" value={alt.id} onChange={(e)=> atualizarRespostaQuestao(e,questao.id)}/>
                      <label>{alt.enunciado}</label>
                    </div>))}
          </div>)}
      </div>
    </div>
  )
}


export default ResponderQuestao