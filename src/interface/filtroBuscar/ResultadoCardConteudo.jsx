import React from 'react'
import "./FiltroBuscar.css"

export default function ResultadoCardConteudo({nome, dados, addConteudo, idObjeto}) {
  return (
    <button className="resultado-card-c" onClick={() => addConteudo(nome, idObjeto)}>
      <div className='resultado-card-esquerda'>
          <p>{nome}</p>
        </div>
        <div className='resultado-card-direita'>
        {dados.map((dado) =>
                ( <p className='dado-card-resultado'>{dado}</p> 
                ))}
      </div>
      </button>
  )
}
