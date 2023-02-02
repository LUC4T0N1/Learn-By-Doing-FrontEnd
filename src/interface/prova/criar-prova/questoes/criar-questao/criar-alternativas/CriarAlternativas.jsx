import React, { useState } from "react";
import "./CriarAlternativas.css";

export default function CriarAlternativas({ handleAdicionarAlternativa }) {
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
              placeholder="Enunciado..."
              onChange={handleChange}
            ></input>
            <select
              name="correta"
              id="correta"
              className="select-simples"
              onChange={handleChange}
            >
              <option value={false}>Falsa</option>
              <option value={true}>Verdadeira</option>
            </select>
          </div>
          <button className="botao-simples" onClick={addAlt}>
            Adicionar
          </button>
        </>
      )}
    </div>
  );
}
