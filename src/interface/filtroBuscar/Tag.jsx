import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default function Tag({ id, nome, handleRemove }) {
  return (
    <div className="tag">
      <button
        className="botao-fechar-tag"
        onClick={() => handleRemove(nome, id)}
      >
        <i>
          <FontAwesomeIcon
            icon={faX}
            rel="noreferrer"
            className="icon-fechar"
          ></FontAwesomeIcon>
        </i>
      </button>
      <p>{nome}</p>
    </div>
  );
}
