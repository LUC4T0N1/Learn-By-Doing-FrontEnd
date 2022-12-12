import React from 'react'
import "./FiltroBuscar.css"

function ResultadoCard({nome, dados}) {
  return (
    <div className='resultado-card'>
      <div className='resultado-card-esquerda'>
        <p>{nome}</p>
      </div>
      <div className='resultado-card-direita'>
      {dados.map((dado) =>
              ( <p className='dado-card-resultado'>{dado}</p> 
              ))}
      </div>
    </div>
  )
}

export default ResultadoCard