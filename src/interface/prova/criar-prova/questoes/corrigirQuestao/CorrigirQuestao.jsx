import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useTranslation } from "react-i18next";
import "./CorrigirQuestao.css";

export default function CorrigirQuestao({
  questao,
  atualizarComentarioQuestao,
  atualizarNotaQuestao,
  qr,
}) {
  const { t } = useTranslation();
  return (
    <div className="visualizar-questao">
      <div className="questao-header">
        <p className="questao-numero">
          {t("questao")} {questao.numeroQuestao}
        </p>
        <div className="questao-dados">
          <p>
            {t(".valor")}
            {questao.valor}
          </p>
          <p>
            {t(".nota")}
            {questao.multiplaEscolha ? (
              questao.notaAluno
            ) : (
              <input
                placeholder={t("nota")}
                className="nota-questao"
                type="number"
                min="0"
                max={questao.valor}
                value={qr.notaQuestao !== undefined ? qr.notaQuestao : null}
                onChange={(e) =>
                  atualizarNotaQuestao(e, questao.idQuestaoResolvida)
                }
              ></input>
            )}
          </p>
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">{t("resposta")} </p>
        <div className="area-resposta">
          {questao.multiplaEscolha ? (
            <>
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
            </>
          ) : (
            <p>{questao.respostaAluno}</p>
          )}
        </div>
        {questao.multiplaEscolha ? (
          <></>
        ) : (
          <>
            <p className="resposta-label">{t("comentario")}: </p>
            <textarea
              placeholder={t("comentario")}
              className="comentario-questao"
              type="text"
              value={qr.comentarioProfessor ? qr.comentarioProfessor : ""}
              onChange={(e) =>
                atualizarComentarioQuestao(e, questao.idQuestaoResolvida)
              }
            ></textarea>
          </>
        )}
      </div>
    </div>
  );
}
