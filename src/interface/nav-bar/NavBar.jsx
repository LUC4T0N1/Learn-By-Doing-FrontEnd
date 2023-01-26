import { faBars, faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../application/autenticacaoSlice";
import { ThemeContext } from "../../infrastructure/context";
import Languages from "../languages-drop-down/Languages";
import Toggle from "../toggle/Toggle";
import "./NavBar.css";

const NavBar = () => {
  const dispatch = useDispatch();

  const [isMobile, setIsMobile] = useState(false);
  const { t } = useTranslation();
  const theme = useContext(ThemeContext);
  const autenticacao = useSelector((state) => state.autenticacao);

  const handleDeslogar = () => {
    console.log("deslogando...");
    dispatch(logout({ ...{} }));
  };

  return (
    <nav className="navbar">
      {autenticacao.token !== "" ? (
        <>
          <div className="nav-menu" id="nav-menu">
            <ul
              className={isMobile ? "nav-links-mobile" : "nav-links"}
              onClick={() => setIsMobile(false)}
            >
              <li className="nav-item">
                <Link
                  className="nav-link-home"
                  to="/"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  <FontAwesomeIcon
                    icon={faHome}
                    className="nav-icon"
                  ></FontAwesomeIcon>
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/tipo-de-prova"
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Resolver Prova
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/criar"
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Criar Prova
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/corrigir/buscarProva"
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Corrigir Prova
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/historico"
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Histórico
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/perfil"
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Perfil
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/login"
                  onClick={handleDeslogar}
                  className="nav-link"
                  style={{ color: theme.state.darkMode ? "white" : "black" }}
                >
                  Logout
                </Link>
              </li>
            </ul>
            <div>
              <button
                className="mobile-menu-icon"
                onClick={() => setIsMobile(!isMobile)}
              >
                {isMobile ? (
                  <FontAwesomeIcon
                    icon={faTimes}
                    className="fas fa-times"
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    icon={faBars}
                    className="fas fa-bars"
                  ></FontAwesomeIcon>
                )}
              </button>
            </div>
          </div>
          <Languages />
          <Toggle />
        </>
      ) : (
        <div className="nav-menu" id="nav-menu">
          <ul
            className={isMobile ? "nav-links-mobile" : "nav-links"}
            onClick={() => setIsMobile(false)}
          >
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link"
                style={{ color: theme.state.darkMode ? "white" : "black" }}
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/registrar"
                className="nav-link"
                style={{ color: theme.state.darkMode ? "white" : "black" }}
              >
                Registrar
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/login"
                className="nav-link"
                style={{ color: theme.state.darkMode ? "white" : "black" }}
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
