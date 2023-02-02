import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProvaFeita } from "../../application/provaSlice";
import VisualizarQuestoes from "../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoes";
import InfosProva from "../prova/provaCompleta/InfosProva";

export default function ProvaResolvida() {
  const location = useLocation();
  const idProva = location.state.idProva;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFeita({ id: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.corrigirProva).provaDto;
  let history = useHistory();

  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.nome}</p>
        <InfosProva prova={prova} />
        {prova.questoes.map((questao, index) => (
          <VisualizarQuestoes
            key={index}
            questao={{
              numeroQuestao: index + 1,
              enunciado: questao.enunciado,
              publica: questao.publica,
              multiplaEscolha: questao.multiplaEscolha,
              id: questao.id,
              valor: questao.valor,
              resposta: questao.resposta,
              alternativas: questao.alternativas,
              notaAluno: questao.notaAluno,
              respostaAluno: questao.respostaAluno,
              comentario: questao.comentario,
            }}
            resposta={questao.respostaAluno}
          />
        ))}
        <button
          className="botao-simples"
          onClick={() => history.push("/perfil/provas-criadas")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
