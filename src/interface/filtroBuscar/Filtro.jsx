import React from 'react'
import "./Buscar.css"

export default function ({nomeFiltro}) {
  return (
    <div className='filtro'>
      <input className='filtro-opcao' type="radio" id={nomeFiltro} name="opcao-filtro" value={nomeFiltro}/>
      <label for={nomeFiltro}>{nomeFiltro}</label>
    </div>
  )
}
