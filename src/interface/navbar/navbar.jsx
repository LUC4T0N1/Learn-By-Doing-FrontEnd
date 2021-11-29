import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import {
  signOut
} from "firebase/auth";
import { auth } from "../../firebase";

const Navbar = () =>{

  const logout = async () => {
    await signOut(auth);
  };

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
        <li >
          <Link style={{ textDecoration: 'none', color: 'inherit' }} onClick={logout} to="/login">Logout</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;