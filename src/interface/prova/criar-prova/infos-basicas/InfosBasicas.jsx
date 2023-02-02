import React, { useState } from "react";
import "./InfosBasicas.css";

export default function InfosBasicas({ handleChange }) {
  const [publica, setPublica] = useState(true);

  const mudarPrivacidade = (e) => {
    if (e.target.value === "true") {
      setPublica(true);
    } else {
      setPublica(false);
    }
  };

  return (
    <div className="infos-basicas">
      <div className="primeira-linha">
        <input
          type="text"
          name="nome"
          onChange={handleChange}
          className="input-texto-simples"
          placeholder="Título da Prova..."
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
          <option value={true}>Pública</option>
          <option value={false}>Privada</option>
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
              onChange={handleChange}
              className="input-numero-simples"
              placeholder="Duração (minutos)..."
            ></input>
            <div className="datas-prova">
              <label>Data permitida para fazer a prova: </label>
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
