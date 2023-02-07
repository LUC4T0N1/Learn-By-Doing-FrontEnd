import React from "react";
import "./PopUp.css";

function PopUp({ mensagem, funcao, mensagemFuncao }) {
  return (
    <div className="Pop-up">
      <div className="Pop-up-container">
        <div className="Pop-up-mini-container">
          <div className="Pop-up-title">{mensagem}</div>
          <button className="botao-simples" onClick={funcao}>
            {mensagemFuncao}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
