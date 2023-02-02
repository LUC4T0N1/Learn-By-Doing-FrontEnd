import React from "react";
import "./resolverProva.css";

export default function InfosProva({ prova }) {
  return (
    <div className="infos-prova">
      <div className="questao-header">
        Quantidade de Questões: {prova.quantidadeQuestoes}
      </div>
      <div className="questao-header">Nota Máxima: {prova.notaMaxima}</div>
    </div>
  );
}
