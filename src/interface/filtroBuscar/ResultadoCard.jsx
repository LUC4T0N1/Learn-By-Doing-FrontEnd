import React from "react";
import { Link } from "react-router-dom";
import "./FiltroBuscar.css";

function ResultadoCard({ nome, dados, idObjeto, tipo }) {
  const definirCaminho = () => {
    if (tipo == 1) {
      return "/buscar-provas";
    } else if (tipo == 2) {
      return "/realizar-prova";
    } else if (tipo == 3) {
      return "/perfil/prova-resolvida";
    } else if (tipo == 4) {
      return "/perfil/prova-criada";
    } else if (tipo == 5) {
      return "/corrigir/buscarProvaFeita";
    } else if (tipo == 6) {
      return "/corrigir";
    }
  };

  const definirState = () => {
    if (tipo == 1) {
      return { idConteudo: idObjeto };
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
