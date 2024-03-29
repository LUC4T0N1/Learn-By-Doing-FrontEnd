import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getProvaCriada } from "../../application/provaSlice";
import VisualizarQuestoesCriadas from "../prova/criar-prova/questoes/visualizar-questoes/VisualizarQuestoesCriadas";
import InfosProva from "../prova/provaCompleta/InfosProva";

export default function ProvaCriada() {
  const { t } = useTranslation();
  let history = useHistory();
  const location = useLocation();
  const obterIdProva = () => {
    try {
      let id = location.state.idProva;
      return id;
    } catch (e) {
      return 0;
    }
  };
  const idProva = obterIdProva();

  const dispatch = useDispatch();
  useEffect(() => {
    if (idProva == 0) {
      history.push("/");
    }
    dispatch(getProvaCriada({ idProva: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.provaCriada);

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
            provaCriada={true}
            numeroQuestao={index + 1}
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
          onClick={() => history.push("/profile/createdTests")}
        >
          {t("voltar")}
        </button>
      </div>
    </div>
  );
}
