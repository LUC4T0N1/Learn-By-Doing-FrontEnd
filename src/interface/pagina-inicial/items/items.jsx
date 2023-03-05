import {
  faFileUpload,
  faHistory,
  faPenFancy,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./items.css";
function Items() {
  const { t } = useTranslation();
  return (
    <div className="items-container">
      <Link className="item" to="/chooseType">
        <div className="item-title">
          {t("resolver-prova")}
          <i>
            <FontAwesomeIcon
              icon={faFileUpload}
              rel="noreferrer"
              className="icon"
            ></FontAwesomeIcon>
          </i>
        </div>
        <div className="item-desc">{t("resolver-prova-desc")}</div>
      </Link>
      <Link className="item" to="/createTest">
        <div className="item-title">
          {t("criar-prova")}
          <i>
            <FontAwesomeIcon
              icon={faPlus}
              rel="noreferrer"
              className="icon"
            ></FontAwesomeIcon>
          </i>
        </div>
        <div className="item-desc">{t("criar-prova-desc")}</div>
      </Link>
      <Link className="item" to="/toCorrect/searchTest">
        <div className="item-title">
          {t("corrigir-prova")}
          <i>
            <FontAwesomeIcon
              icon={faPenFancy}
              rel="noreferrer"
              className="icon"
            ></FontAwesomeIcon>
          </i>
        </div>
        <div className="item-desc">{t("corrigir-prova-desc")}</div>
      </Link>
      <Link className="item" to="/record">
        <div className="item-title">
          {t("historico")}
          <i>
            <FontAwesomeIcon
              icon={faHistory}
              rel="noreferrer"
              className="icon"
            ></FontAwesomeIcon>
          </i>
        </div>
        <div className="item-desc">{t("historico-desc")}</div>
      </Link>
    </div>
  );
}

export default Items;
