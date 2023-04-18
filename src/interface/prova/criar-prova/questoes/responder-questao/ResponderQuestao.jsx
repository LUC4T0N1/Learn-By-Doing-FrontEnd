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
          <p>
            {t(".valor")}
            {questao.valor}
          </p>
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">{t("resposta:")} </p>
        {!questao.multiplaEscolha ? (
          <textarea
            maxlength="20000"
            type="text"
            name="resposta"
            className="input-texto-grande"
            placeholder={t("resposta...")}
            onChange={(e) => atualizarRespostaQuestao(e, questao.id)}
          ></textarea>
        ) : (
          <div className="area-resposta">
            {questao.alternativas.map((alt, index) => (
              <div>
                <input
                  className="filtro-opcao"
                  type="radio"
                  name={numeroQuestao}
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
