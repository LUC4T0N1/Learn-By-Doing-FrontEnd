import { faLock, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./escolherTipo.css";

const EscolherTipo = () => {
  const { t } = useTranslation();
  return (
    <div className="escolher-tipo">
      <h1 className="escolher-titulo">{t("escolher-prova")}</h1>
      <div className="items-container">
        <Link className="item" to="/escolherProvaPrivada">
          <div className="item-title">
            {t("prova-privada")}
            <i>
              <FontAwesomeIcon
                icon={faLock}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">{t("prova-privada-desc")}</div>
        </Link>
        <Link className="item" to="/buscar-conteudos">
          <div className="item-title">
            {t("prova-publica")}
            <i>
              <FontAwesomeIcon
                icon={faUnlock}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">{t("prova-publica-desc")}</div>
        </Link>
      </div>
    </div>
  );
};

export default EscolherTipo;
