import React from 'react'



function ProvaFeitaCard({nome, nomeAluno, notaAluno, totalmenteCorrigida}) {
  return (
    <div style ={{ backgroundColor : "white", margin: "10px", width: "200px"}} className='provaCard' onMouseOver={() => {console.log(nome);}}>
      <p>{nome}</p>
      <p>Realizada Por: {nomeAluno}</p>
      <p>Nota: {notaAluno}</p>
      <p>Corrigida Por Completo: {totalmenteCorrigida? (<span>sim</span>): (<span>nao</span>)}</p>
    </div>
  )
}

export default ProvaFeitaCard
