import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import "./VisualizarQuestoes.css";

export default function VisualizarQuestoes({ questao, resposta }) {
  return (
    <div className="visualizar-questao">
      <div className="questao-header">
        <p className="questao-numero">Questão {questao.numeroQuestao}</p>
        <div className="questao-dados">
          <p>· Valor: {questao.valor}</p>
          <p>· Nota: {questao.notaAluno}</p>
        </div>
      </div>
      <p className="visualizar-enunciado">{questao.enunciado}</p>
      <div className="campo-resposta">
        <p className="resposta-label">Resposta: </p>
        {!questao.multiplaEscolha ? (
          <div className="area-resposta">
            <p>{questao.resposta}</p>
          </div>
        ) : (
          <div className="area-resposta">
            {questao.alternativas.map((alt) => (
              <p
                className={
                  alt.id == questao.respostaAluno
                    ? "visualizar-alternativa-respondida"
                    : "visualizar-alternativa"
                }
              >
                {alt.correta ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="alt-icon-verdadeiro"
                  ></FontAwesomeIcon>
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="alt-icon-falso"
                  ></FontAwesomeIcon>
                )}
                {alt.enunciado}
              </p>
            ))}
          </div>
        )}
      </div>
      {!questao.multiplaEscolha ? (
        <div className="campo-resposta">
          <p className="resposta-label">Comentário Professor: </p>
          <div className="area-resposta">
            <p>{questao.comentario}</p>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
