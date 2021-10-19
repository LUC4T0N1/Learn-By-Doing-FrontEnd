import React from 'react'

const ConteudoCard = ({ idConteudo, nome, numeroProvas }) => {
  return (
    <div style ={{ backgroundColor : "white", margin: "10px", width: "200px"}}>
      <h4>id: {idConteudo}</h4>
      <h4>nome: {nome}</h4>
      <h4>numeroProvas: {numeroProvas}</h4>
    </div>
  );
}

export default ConteudoCard
