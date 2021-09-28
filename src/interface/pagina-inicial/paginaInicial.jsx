import React from 'react'
import { Link } from 'react-router-dom'
import './paginaInicial.css'

const PaginaInicial = () =>{
  return(
    <div className="inicio">
      <div>
        <Link to="/conteudos">Realizar Prova</Link>
      </div>
      <div>
        <Link to="/criar">Criar Prova</Link>
      </div>
    </div>
  
  )
}

export default PaginaInicial;