import React from 'react'
import { Link } from 'react-router-dom'
import './paginaInicial.css'

const PaginaInicial = () =>{
  return(
    <div className="inicio">
      <div>
        <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/conteudos">Realizar Prova</Link>
      </div>
      <div>
        <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/criar">Criar Prova</Link>
      </div>
    </div>
  
  )
}

export default PaginaInicial;