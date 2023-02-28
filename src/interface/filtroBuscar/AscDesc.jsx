import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AscDesc({ ordem, ascendente, descendente, e2, e3 }) {
  return (
    <div
      className={
        e2 ? "setas-ordenacao2" : e3 ? "setas-ordenacao3" : "setas-ordenacao"
      }
    >
      <button
        className={
          ordem == 0
            ? e2 || e3
              ? "botao-seta-selecionada2"
              : "botao-seta-selecionada"
            : e2 || e3
            ? "botao-seta-nao-selecionada2"
            : "botao-seta-nao-selecionada"
        }
        onClick={ascendente}
      >
        <FontAwesomeIcon icon={faUpLong} className="seta"></FontAwesomeIcon>
      </button>
      <button
        className={
          ordem == 1
            ? e2 || e3
              ? "botao-seta-selecionada2"
              : "botao-seta-selecionada"
            : e2 || e3
            ? "botao-seta-nao-selecionada2"
            : "botao-seta-nao-selecionada"
        }
        onClick={descendente}
      >
        <FontAwesomeIcon icon={faDownLong} className="seta"></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default AscDesc;
