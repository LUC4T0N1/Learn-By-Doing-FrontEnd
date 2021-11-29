import React from 'react'



function QuestaoCard({ enunciado, valor, multiplaEscolha, alternativas, nomeConteudos, resposta, publica}) {
  return (<div style ={{ backgroundColor : "white", margin: "10px", width: "200px"}} className='questaoCard'>
      <p>enunciado: {enunciado} </p>
      <p>valor: {valor}</p>
    {multiplaEscolha ? (
    <div>  
    <div style = {{ display : "block", flexWrap : "wrap"}}>
      {alternativas.map((alt) => (
        <p> {alternativas.findIndex(a => a ===alt)+1}) {alt.enunciado} {alt.correta ? ('correta') : ('incorreta')} </p>
      ))}
    </div>
    </div>) : 
    (<div>
      <p>resposta: {resposta} </p>
    </div>)
  }
      <p>publica: {publica} </p>
      <div style = {{ display : "block", flexWrap : "wrap"}}>
        <p>conteudos: </p>
      {nomeConteudos.map((cont) => (
        <p> {cont} </p>
      ))}
    </div>
  </div>
  )
}

export default QuestaoCard
