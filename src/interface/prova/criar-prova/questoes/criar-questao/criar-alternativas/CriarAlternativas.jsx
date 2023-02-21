import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./CriarAlternativas.css";

export default function CriarAlternativas({ handleAdicionarAlternativa }) {
  const { t } = useTranslation();
  const [add, setAdd] = useState(false);
  const [alternativa, setAlternativa] = useState({
    enunciado: "",
    correta: false,
  });

  const handleAdd = (e) => {
    setAdd(true);
  };

  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    setAlternativa({ ...alternativa, [nome]: value });
  };
  const addAlt = (e) => {
    setAdd(false);
    handleAdicionarAlternativa(alternativa);
    setAlternativa({ enunciado: "", correta: false });
  };

  return (
    <div className="container-alternativas">
      {!add ? (
        <>
          <button className="botao-simples" onClick={handleAdd}>
            +
          </button>
        </>
      ) : (
        <>
          <div className="mini-container">
            <input
              type="text"
              name="enunciado"
              className="input-texto-simples"
              placeholder={t("enunciado...")}
              onChange={handleChange}
            ></input>
            <select
              name="correta"
              id="correta"
              className="select-simples"
              onChange={handleChange}
            >
              <option value={false}>{t("falsa")}</option>
              <option value={true}>{t("verdadeira")}</option>
            </select>
          </div>
          <button className="botao-simples" onClick={addAlt}>
            {t("adicionar")}
          </button>
        </>
      )}
    </div>
  );
}
