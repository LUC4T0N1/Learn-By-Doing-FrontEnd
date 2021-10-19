import React from 'react'



function ProvaCard({nome, id, mediaNotas, popularidade}) {
  return (
    <div style ={{ backgroundColor : "white", margin: "10px", width: "200px"}} className='provaCard' onMouseOver={() => {console.log(nome);}}>
      <p>id: {id} </p>
      <p>{nome}</p>
      <p>mediaNotas: {mediaNotas}</p>
      <p>Realizações: {popularidade}</p>
    </div>
  )
}

export default ProvaCard
