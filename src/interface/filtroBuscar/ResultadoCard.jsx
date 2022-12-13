import React from 'react'
import "./FiltroBuscar.css"
import { Link } from "react-router-dom";

function ResultadoCard({nome, dados, idObjeto, tipo}) {
  const definirCaminho = () => {
      if(tipo == 1){
        return "/buscar-provas"
      }else{
        return "/realizar-prova-publica"
      }
  } 

  const definirState = () => {
    if(tipo == 1){
      return {idConteudo : idObjeto}
    }else{
      return {idProva : idObjeto}
    }
} 
  return (
    <Link className="resultado-card" to={{
      pathname: definirCaminho(),
      state: definirState()
    }}>
      <div className='resultado-card-esquerda'>
        <p>{nome}</p>
      </div>
      <div className='resultado-card-direita'>
      {dados.map((dado) =>
              ( <p className='dado-card-resultado'>{dado}</p> 
              ))}
      </div>
    </Link>
  )
}

export default ResultadoCard