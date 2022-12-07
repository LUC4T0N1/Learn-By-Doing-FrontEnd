import React, {useState} from 'react'

export default function CriarAlternativas() {
  const [add, setAdd] = useState(false);

  const handleAdd = (e) => {
      setAdd(true);
  }  

  return (
    <div className='container-alternativas'>
      {!add ? 
        (<>
        <button className='botao-simples' onClick={handleAdd}>+</button>
        </>) 
        : 
        (<>
         <input type="text" name="nome-prova" className='input-texto-simples' placeholder="Enunciado..."></input>
        <select name="privacidade" id="privacidade" className='select-simples' onChange={handleAdd}>
          <option value={true}>Verdadeira</option>
          <option value={false}>Falsa</option>
        </select>
        <button className='botao-simples' onClick={handleAdd}>Adicionar</button>
        </>)}
       
    </div>
  )
}
