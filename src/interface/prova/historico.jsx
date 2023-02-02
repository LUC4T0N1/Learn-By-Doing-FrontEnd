import { faCheck, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import "./escolherTipo.css";

const Historico = () => {
  return (
    <div className="escolher-tipo">
      <h1 className="escolher-titulo">Escolha uma Das Opções</h1>
      <div className="items-container">
        <Link className="item" to="/perfil/provas-resolvidas">
          <div className="item-title">
            Provas Resolvidas
            <i>
              <FontAwesomeIcon
                icon={faCheck}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">
            Ver todas as provas que você já resolveu
          </div>
        </Link>
        <Link className="item" to="/perfil/provas-criadas">
          <div className="item-title">
            Provas Criadas
            <i>
              <FontAwesomeIcon
                icon={faFolderPlus}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">
            Ver todas as provas já criadas por você
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Historico;
