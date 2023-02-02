import { faDownLong, faUpLong } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function AscDesc({ ordem, ascendente, descendente }) {
  return (
    <div className="setas-ordenacao">
      <button
        className={
          ordem == 0 ? "botao-seta-selecionada" : "botao-seta-nao-selecionada"
        }
        onClick={ascendente}
      >
        <FontAwesomeIcon icon={faUpLong} className="seta"></FontAwesomeIcon>
      </button>
      <button
        className={
          ordem == 1 ? "botao-seta-selecionada" : "botao-seta-nao-selecionada"
        }
        onClick={descendente}
      >
        <FontAwesomeIcon icon={faDownLong} className="seta"></FontAwesomeIcon>
      </button>
    </div>
  );
}

export default AscDesc;
