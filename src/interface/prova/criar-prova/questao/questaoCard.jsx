import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { setProva } from '../../../../application/provaSlice';


function QuestaoCard({ enunciado, valor, multiplaEscolha, alternativas, nomeConteudos, resposta, publica, id}) {
  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.prova);
  const questao = prova.questoes.filter(q => q.id == id)[0]
  console.log("questao: "+ JSON.stringify(questao))
  console.log("questao valora: "+ questao.valor)

  const handleChange = (e) => {
    const valor = e.target.value;
    const val = valor
    console.log("valor: "+ val)
    let questoes = prova.questoes;
    let questoesDto = JSON.parse(JSON.stringify(questoes));
    let objIndex = questoesDto.findIndex(q => q.id == id);
    console.log("Before update: ", questoesDto[objIndex])
    questoesDto[objIndex].valor = val
    console.log("After update: ", questoesDto[objIndex])
    dispatch(setProva({ ...prova, questoes : questoesDto}));
  }  



  return (<div style ={{ backgroundColor : "white", margin: "10px", width: "200px"}} className='questaoCard'>
      <p>enunciado: {enunciado} </p>
      <label htmlFor='tentativas'>Valor: </label>
              <input
                type='number'
                min="1"
                id='Valor'
                name='Valor'
                onChange={handleChange}
               />
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
