import React from "react";
import { useTranslation } from "react-i18next";

function ResponderQuestao({
  questao,
  atualizarRespostaQuestao,
  numeroQuestao,
}) {
  const { t } = useTranslation();
  return (
    <div className="visualizar-questao">
      <div className="questao-header">
        <p className="questao-numero">Questão {numeroQuestao}</p>
        <div className="questao-dados">
          {questao.multiplaEscolha ? (
            <p>· {t("multipla-escolha")}</p>
          ) : (
            <p>· {t("dissertativa")}</p>
          )}
          {questao.publica ? <p>· {t("publica")}</p> : <p>· {t("privada")}</p>}
          {
            <p>
              {t(".valor")}
              {questao.valor}
            </p>
          }
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">{t("resposta:")} </p>
        {!questao.multiplaEscolha ? (
          <div className="area-resposta">
            <textarea
              type="text"
              name="resposta"
              className="input-texto-grande"
              placeholder={t("resposta...")}
              onChange={(e) => atualizarRespostaQuestao(e, questao.id)}
            ></textarea>
          </div>
        ) : (
          <div className="area-resposta">
            {questao.alternativas.map((alt) => (
              <div>
                <input
                  className="filtro-opcao"
                  type="radio"
                  name={alt.id}
                  value={alt.id}
                  onChange={(e) => atualizarRespostaQuestao(e, questao.id)}
                />
                <label>{alt.enunciado}</label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResponderQuestao;
