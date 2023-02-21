import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setProva } from "../../application/provaSlice";

export default function ResultadoQuestao({ questao, handleClose }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.prova);
  const [valorQuestao, setValorQuestao] = useState(0);

  const [erro, setErro] = useState(false);

  const addQuestao = () => {
    if (valorQuestao > 0) {
      let q = questao;
      q.valor = valorQuestao;
      q.editavel = false;
      dispatch(setProva({ ...prova, questoes: prova.questoes.concat(q) }));
      handleClose();
    } else {
      setErro(true);
    }
  };

  const changeValor = (e) => {
    const valor = e.target.value;
    setValorQuestao(valor);
  };

  return (
    <div className="visualizar-questao">
      <div className="questao-header">
        <p className="questao-numero">
          {t("questao")} {questao.numeroQuestao}
        </p>
        <div className="questao-dados">
          {questao.multiplaEscolha ? (
            <p>· {t("multipla-escolha")}</p>
          ) : (
            <p>· {t("dissertativa")}</p>
          )}
          {questao.publica ? <p>· {t("publica")}</p> : <p>· {t("privada")}</p>}
          <input
            type="number"
            min="0.1"
            name="valor"
            onChange={changeValor}
            className="input-valor"
            placeholder="Valor.."
          ></input>
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">{t("resposta:")}</p>
        {!questao.multiplaEscolha ? (
          <div className="area-resposta">
            <p>{questao.resposta}</p>
          </div>
        ) : (
          <div className="area-resposta">
            {questao.alternativas.map((alt) => (
              <p className="visualizar-alternativa">
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
      <div>
        <button onClick={addQuestao}>{t("add-a-prova")}</button>
        {erro ? (
          <p className="error-message">{t("aviso-questao-valor")}</p>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
