import React from 'react'
import './perfil.css'
import { Link } from 'react-router-dom'

function Perfil() {
  return (
    <div className="perfil">
    <div>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/perfil/provas-criadas">Provas Criadas</Link>
  </div>
  <div>
    <Link style={{ textDecoration: 'none', color: 'inherit', color: 'white'}} to="/perfil/provas-resolvidas">Provas Resolvidas</Link>
  </div>
  </div>
  )
}

export default Perfil
