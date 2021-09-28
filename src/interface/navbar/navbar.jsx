import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'

const Navbar = () =>{
  return(
    <nav >
      <ul className="navbar">
        <li >
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to="/registrar">Registrar</Link>
        </li>
        <li >
          <Link style={{ textDecoration: 'none', color: 'inherit'}} to="/perfil">Perfil</Link>
        </li>
        <li >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/login">Login</Link>
        </li>
        <li >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} to="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;