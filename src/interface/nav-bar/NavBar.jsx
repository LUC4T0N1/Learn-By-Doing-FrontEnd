import "./NavBar.css"
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons'
import Toggle from "../toggle/Toggle"; 
import Languages from '../languages-drop-down/Languages';
import {useTranslation} from 'react-i18next';
import { Link } from "react-router-dom";
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { ThemeContext } from "../../infrastructure/context";
import { useContext } from "react";

const NavBar = () => {

  const [isMobile, setIsMobile] = useState(false);
  const {t} = useTranslation()
  const theme =  useContext(ThemeContext);
  return (
    <nav className="navbar">
      <div className="nav-menu" id="nav-menu">
        <ul className={isMobile? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}>
           <li className="nav-item">
            <Link className="nav-link-home" to="/" style={{ color: theme.state.darkMode ?   "white" : "black" }}>
              <FontAwesomeIcon icon={faHome} className='nav-icon'></FontAwesomeIcon>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tipo-de-prova" className="nav-link" style={{ color: theme.state.darkMode ?   "white" : "black" }}>Resolver Prova</Link>
          </li>
          <li className="nav-item">
            <Link to="/criar-prova" className="nav-link" style={{ color: theme.state.darkMode ?   "white" : "black" }}>Criar Prova</Link>
          </li>
          <li className="nav-item">
            <Link to="/corrigir" className="nav-link" style={{ color: theme.state.darkMode ?   "white" : "black" }}>Corrigir Prova</Link>
          </li>
          <li className="nav-item">
            <Link to="/historico" className="nav-link" style={{ color: theme.state.darkMode ?   "white" : "black" }}>Histórico</Link>
          </li>
          <li className="nav-item">
            <Link to="/login" className="nav-link" style={{ color: theme.state.darkMode ?   "white" : "black" }}>Logout</Link>
          </li>
        </ul>
        <div>
          <button className="mobile-menu-icon"
          onClick={() => setIsMobile(!isMobile)}>
            {isMobile ? (
              <FontAwesomeIcon icon={faTimes} className='fas fa-times'></FontAwesomeIcon>
            ) : (
              <FontAwesomeIcon icon={faBars} className='fas fa-bars'></FontAwesomeIcon>
            )}
          </button>
        </div>
      </div>
      <Languages/>
      <Toggle/>
    </nav>
  )
}

export default NavBar