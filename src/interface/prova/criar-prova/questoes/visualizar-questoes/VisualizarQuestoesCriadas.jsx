import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProva } from "../../../../../application/provaSlice";
import { setQuestao } from "../../../../../application/questaoSlice";
import EditarQuestoes from "../editar-questao/EditarQuestoes";
import "./VisualizarQuestoes.css";

export default function VisualizarQuestoesCriadas({
  questao,
  nomeConteudos,
  podeRemover,
  numeroQuestao,
}) {
  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);

  const changeValor = (e) => {
    const valor = e.target.value;
    let questoes = prova.questoes.map((item) =>
      Object.assign({}, item, { selected: false })
    );
    let questaoIndex = questoes.findIndex((q) => q.id == questao.id);
    questoes[questaoIndex].valor = valor;
    dispatch(setProva({ ...prova, questoes: questoes }));
  };

  const removerQuestao = (e) => {
    let questoes = prova.questoes.map((item) =>
      Object.assign({}, item, { selected: false })
    );
    questoes = questoes.filter(function (obj) {
      return obj.id != questao.id;
    });
    dispatch(setProva({ ...prova, questoes: questoes }));
  };

  const [editar, setEditar] = useState(false);

  const editarQuestao = (e) => {
    dispatch(setQuestao({ ...questao }));
    setEditar(true);
  };

  const handleClose = () => {
    setEditar(false);
  };

  return (
    <>
      {editar ? (
        <>
          <EditarQuestoes handleClose={handleClose} questao={questao} />
        </>
      ) : (
        <div className="visualizar-questao">
          <div className="questao-header">
            <p className="questao-numero">Questão {numeroQuestao}</p>
            <div className="questao-dados">
              {questao.multiplaEscolha ? (
                <p>· Multipla Escolha</p>
              ) : (
                <p>· Dissertativa</p>
              )}
              {questao.publica ? <p>· Publica</p> : <p>· Privada</p>}
              {
                <p>
                  · Valor:{" "}
                  <input
                    type="number"
                    min="0.1"
                    name="valor"
                    onChange={changeValor}
                    className="input-valor"
                    placeholder={questao.valor}
                  ></input>
                </p>
              }
              <div className="botoes-questao">
                {podeRemover ? (
                  <button
                    className="botao-remover-questao"
                    onClick={removerQuestao}
                  >
                    Remover
                  </button>
                ) : (
                  <></>
                )}

                {questao.editavel == true || questao.editavel == "true" ? (
                  <button
                    className="botao-editar-questao"
                    onClick={editarQuestao}
                  >
                    Editar
                  </button>
                ) : (
                  <></>
                )}
              </div>
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
                  <p className="visualizar-alternativa">
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
        </div>
      )}
    </>
  );
}
