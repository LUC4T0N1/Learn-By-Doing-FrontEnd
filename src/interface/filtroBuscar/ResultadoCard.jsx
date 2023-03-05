import React from "react";
import { Link } from "react-router-dom";
import "./FiltroBuscar.css";

function ResultadoCard({ nome, dados, idObjeto, tipo, publica }) {
  const definirCaminho = () => {
    if (tipo == 1) {
      return "/searchTests";
    } else if (tipo == 2) {
      return "/solveTest";
    } else if (tipo == 3) {
      return "/profile/solvedTest";
    } else if (tipo == 4) {
      return "/profile/createdTest";
    } else if (tipo == 5) {
      return "/toCorrect/searchSolvedTest";
    } else if (tipo == 6) {
      return "/toCorrect";
    }
  };

  const definirState = () => {
    if (tipo == 1) {
      return { idConteudo: idObjeto };
    } else if (tipo == 3) {
      return { idProva: idObjeto, publica: publica };
    } else {
      return { idProva: idObjeto };
    }
  };
  return (
    <Link
      className="resultado-card"
      to={{
        pathname: definirCaminho(),
        state: definirState(),
      }}
    >
      <div className="resultado-card-esquerda">
        <p>{nome}</p>
      </div>
      <div className="resultado-card-direita">
        {dados.map((dado) => (
          <p className="dado-card-resultado">{dado}</p>
        ))}
      </div>
    </Link>
  );
}

export default ResultadoCard;
