import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProva } from "../../application/provaSlice";
import VisualizarQuestoesCriadas from "../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoesCriadas";
import InfosProva from "../prova/provaCompleta/InfosProva";

export default function ProvaCriada() {
  let history = useHistory();
  const location = useLocation();
  const idProva = location.state.idProva;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProva({ idProva: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.realizarProva);

  const atualizarRespostaQuestao = (e, idQuestao) => {
    return;
  };

  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.nome}</p>
        <InfosProva prova={prova} />
        {prova.questoes.map((questao, index) => (
          <VisualizarQuestoesCriadas
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
            }}
            atualizarRespostaQuestao={atualizarRespostaQuestao}
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
