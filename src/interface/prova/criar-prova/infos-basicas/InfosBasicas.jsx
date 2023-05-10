import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./InfosBasicas.css";

export default function InfosBasicas({ handleChange }) {
  const { t } = useTranslation();
  const [publica, setPublica] = useState(true);

  const mudarPrivacidade = (e) => {
    if (e.target.value === "true") {
      setPublica(true);
      /*       zerarDadosProvaPrivada();
       */
    } else {
      setPublica(false);
    }
  };

  return (
    <div className="infos-basicas">
      <div className="primeira-linha">
        <input
          maxlength="49"
          type="text"
          name="nome"
          onChange={handleChange}
          className="input-texto-simples"
          placeholder={t("titulo-prova")}
        ></input>
        <select
          name="publica"
          id="privacidade"
          className="select-simples"
          onChange={(e) => {
            mudarPrivacidade(e);
            handleChange(e);
          }}
        >
          <option value={true}>{t("publica")}</option>
          <option value={false}>{t("privada")}</option>
        </select>
      </div>
      {publica ? (
        <></>
      ) : (
        <>
          <div className="segunda-linha">
            <input
              type="number"
              name="tempo"
              step="1"
              onChange={handleChange}
              className="input-numero-simples-ib"
              placeholder={t("duracao")}
            ></input>
            <input
              type="number"
              min="1"
              step="1"
              name="tentativas"
              onChange={handleChange}
              className="input-numero-simples-ib"
              placeholder={t("tentativas")}
            ></input>
            <div className="datas-prova">
              <label>{t("data-prova")} </label>
              <input
                className="input-data"
                type="date"
                id="start"
                onChange={handleChange}
                name="dataInicial"
              ></input>
              <input
                className="input-data"
                type="date"
                id="start"
                onChange={handleChange}
                name="dataFinal"
              ></input>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
