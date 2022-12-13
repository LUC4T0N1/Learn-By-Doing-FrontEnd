import React from 'react'

export default function ({index, nomeFiltro, mudarOrdenacao}) {
  console.log("index: " + index + "nome: " + nomeFiltro)
  return (
    <div className='opcao'>
      {index == 0 ? (
        <input className='filtro-opcao' type="radio" id={nomeFiltro} name="opcao-filtro" value={index} 
        defaultChecked onChange={mudarOrdenacao}/>
      ) : (
        <input className='filtro-opcao' type="radio" id={nomeFiltro} name="opcao-filtro" value={index} onChange={mudarOrdenacao}/>
      )}
      <label for={nomeFiltro}>{nomeFiltro}</label>
    </div>
  )
}
