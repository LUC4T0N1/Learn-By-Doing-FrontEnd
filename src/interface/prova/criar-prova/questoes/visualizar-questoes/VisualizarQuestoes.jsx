import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import "./VisualizarQuestoes.css";

export default function VisualizarQuestoes({ questao, resposta }) {
  const { t } = useTranslation();
  return (
    <div className="visualizar-questao">
      <div className="questao-header">
        <p className="questao-numero">
          {t("questao")}
          {questao.numeroQuestao}
        </p>
        <div className="questao-dados">
          <p>
            {t(".valor")} {questao.valor}
          </p>
          <p>
            {t(".nota")} {questao.notaAluno}
          </p>
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">{t("resposta:")} </p>
        {!questao.multiplaEscolha ? (
          <div className="area-resposta">
            <p>{questao.respostaAluno}</p>
          </div>
        ) : (
          <div className="area-resposta">
            {questao.alternativas.map((alt) => (
              <p
                className={
                  alt.id == questao.respostaAluno
                    ? "visualizar-alternativa-respondida"
                    : "visualizar-alternativa"
                }
              >
                {alt.correta ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="alt-icon-verdadeiro"
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="alt-icon-falso"
                  ></FontAwesomeIcon>
                )}
                {alt.enunciado}
              </p>
            ))}
          </div>
        )}
      </div>
      {!questao.multiplaEscolha &&
      questao.comentario != null &&
      questao.comentario != "" ? (
        <div className="campo-resposta">
          <p className="resposta-label">{t("comentario-professor")}</p>
          <div className="area-resposta">
            <p>{questao.comentario}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
