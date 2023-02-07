import React from "react";
import "./resolverProva.css";

export default function InfosProva({ prova }) {
  return (
    <div className="infos-prova">
      <div className="questao-header">
        Quantidade de Questões: {prova.quantidadeQuestoes}
      </div>
      <div className="questao-header">Nota Máxima: {prova.notaMaxima}</div>
      {prova.idSecreto ? (
        <div className="questao-header">Id Secreto: {prova.idSecreto}</div>
      ) : (
        <></>
      )}
      {prova.tempo > 0 ? (
        <div className="questao-header">Tempo: {prova.tempo}</div>
      ) : (
        <></>
      )}
      {prova.tentativas > 0 ? (
        <>
          <div className="questao-header">Tentativas: {prova.tentativas}</div>
          <div className="questao-header">Realizações: {prova.realizacoes}</div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
