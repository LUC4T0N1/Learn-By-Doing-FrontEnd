import React from "react";
import { useTranslation } from "react-i18next";
import "./erro.css";

function Erro() {
  const { t } = useTranslation();
  return (
    <div className="mensagemErro">
      <h1>{t("404")}</h1>
    </div>
  );
}

export default Erro;
