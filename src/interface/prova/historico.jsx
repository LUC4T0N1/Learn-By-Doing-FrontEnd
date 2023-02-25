import { faCheck, faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./escolherTipo.css";

const Historico = () => {
  const { t } = useTranslation();
  return (
    <div className="escolher-tipo">
      <h1 className="escolher-titulo"> {t("escolher-prova")}</h1>
      <div className="items-container-2">
        <Link className="item-2" to="/perfil/provas-resolvidas">
          <div className="item-title">
            {t("provas-resolvidas")}
            <i>
              <FontAwesomeIcon
                icon={faCheck}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">{t("provas-resolvidas-desc")}</div>
        </Link>
        <Link className="item-2" to="/perfil/provas-criadas">
          <div className="item-title">
            {t("provas-criadas")}
            <i>
              <FontAwesomeIcon
                icon={faFolderPlus}
                rel="noreferrer"
                className="icon"
              ></FontAwesomeIcon>
            </i>
          </div>
          <div className="item-desc">{t("provas-criadas-desc")}</div>
        </Link>
      </div>
    </div>
  );
};

export default Historico;
