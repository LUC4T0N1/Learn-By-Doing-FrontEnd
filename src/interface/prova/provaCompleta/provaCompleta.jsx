import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  getProvaFazer,
  realizarProva,
  setRealizarProva,
} from "../../../application/provaSlice";
import "../criar-prova/criarProva.css";
import ResponderQuestao from "../criar-prova/questoes/responder-questao/ResponderQuestao";
import InfosProva from "./InfosProva";

export default function ProvaCompleta() {
  const location = useLocation();
  const idProva = location.state.idProva;

  const [comecou, setComecou] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProvaFazer({ idProva: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.realizarProva);

  const [open, setOpen] = React.useState(false);

  const finalizarProva = (e) => {
    dispatch(realizarProva({ ...prova, fodase: "" }));
    dispatch(
      setRealizarProva({
        realizarProva: {
          nome: "",
          publica: true,
          conteudos: [],
          nomeConteudos: [],
          questoes: [],
          idsQuestoes: [],
          quantidadeQuestoes: 0,
          tempo: 0,
          questoesRespondidasDto: [],
        },
      })
    );
  };
  const handleClickOpen = (e) => {
    setOpen(true);
    let responderQuestoes = [];
    prova.questoes.map((questao) => {
      let quest = { respostaAluno: "", idQuestao: questao.id };
      responderQuestoes.push(quest);
    });
    dispatch(
      setRealizarProva({ ...prova, questoesRespondidasDto: responderQuestoes })
    );
  };

  const atualizarRespostaQuestao = (e, idQuestao) => {
    const resposta = e.target.value;
    const resp = resposta;
    let questoesRespondidas = prova.questoesRespondidasDto;
    let questoesRespondidasDto = JSON.parse(
      JSON.stringify(questoesRespondidas)
    );
    if (questoesRespondidasDto.length == 0) {
      prova.questoes.map((q) => {
        questoesRespondidasDto.push({ idQuestao: q.id, respostaAluno: "" });
      });
    }
    let objIndex = questoesRespondidasDto.findIndex(
      (obj) => obj.idQuestao == idQuestao
    );
    questoesRespondidasDto[objIndex].respostaAluno = resp;

    dispatch(
      setRealizarProva({
        ...prova,
        questoesRespondidasDto: questoesRespondidasDto,
      })
    );
  };

  const comecarProva = () => {
    setComecou(true);
  };
  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.nome}</p>
        <InfosProva prova={prova} />
        {comecou ? (
          <>
            {prova.questoes.map((questao) => (
              <ResponderQuestao
                questao={questao}
                atualizarRespostaQuestao={atualizarRespostaQuestao}
              />
            ))}
            <button className="botao-simples" onClick={finalizarProva}>
              Finalizar Prova
            </button>
          </>
        ) : (
          <>
            <button className="botao-simples" onClick={comecarProva}>
              Começar Prova
            </button>
          </>
        )}
      </div>
    </div>
  );
}
