import React from "react";
import { useTranslation } from "react-i18next";
import "./resolverProva.css";

export default function InfosProva({ prova }) {
  const { t } = useTranslation();
  return (
    <div className="infos-prova">
      <div className="questao-header">
        {t("questoes")} {prova.quantidadeQuestoes}
      </div>
      <div className="questao-header">
        {t("nota-maxima")}
        {prova.notaMaxima}
      </div>
      {prova.idSecreto ? (
        <div className="questao-header">
          {t("id-secreto")}
          {prova.idSecreto}
        </div>
      ) : (
        <></>
      )}
      {prova.tempo > 0 ? (
        <div className="questao-header">
          {t("tempo")}
          {prova.tempo}
        </div>
      ) : (
        <></>
      )}
      {prova.tentativas > 0 ? (
        <>
          <div className="questao-header">
            {t("tentativas")} {prova.tentativas}
          </div>
          <div className="questao-header">
            {t("realizacoes")} {prova.realizacoes}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
