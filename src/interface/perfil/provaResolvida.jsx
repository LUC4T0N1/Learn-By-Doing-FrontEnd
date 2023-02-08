import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProvaFeita } from "../../application/provaSlice";
import VisualizarQuestoes from "../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoes";
import VisualizarQuestoesProvaPublica from "../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoesProvaPublica";
import InfosProva from "../prova/provaCompleta/InfosProva";

export default function ProvaResolvida() {
  const location = useLocation();
  const obterIdProva = () => {
    try {
      let id = location.state.idProva;
      return id;
    } catch (e) {
      return 0;
    }
  };
  const obterPublica = () => {
    try {
      let id = location.state.publica;
      return id;
    } catch (e) {
      return 3;
    }
  };
  const idProva = obterIdProva();
  const publica = obterPublica();
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    if (idProva == 0 || publica == 3) {
      history.push("/");
    }
    dispatch(getProvaFeita({ id: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.provaResolvida).provaDto;

  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.nome}</p>
        <InfosProva prova={prova} />
        {prova.questoes.map((questao, index) =>
          publica ? (
            <VisualizarQuestoesProvaPublica
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
          ) : (
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
          )
        )}
        <button
          className="botao-simples"
          onClick={() => history.push("/perfil/provas-resolvidas")}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
