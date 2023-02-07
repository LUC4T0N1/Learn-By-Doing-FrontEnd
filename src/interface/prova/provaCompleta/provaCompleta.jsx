import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getProvaFazer,
  realizarProva,
  setRealizarProva,
} from "../../../application/provaSlice";
import AuthHeader from "../../../AuthContext";
import "../criar-prova/criarProva.css";
import ResponderQuestao from "../criar-prova/questoes/responder-questao/ResponderQuestao";
import Countdown from "./Countdown";
import InfosProva from "./InfosProva";

export default function ProvaCompleta() {
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

  const [comecou, setComecou] = useState(false);
  let history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (idProva == 0) {
      history.push("/");
    }
    dispatch(getProvaFazer({ idProva: idProva }));
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.realizarProva);

  const [open, setOpen] = React.useState(false);

  const finalizarProva = (e) => {
    console.log("oi");
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

  const comecarProva = async () => {
    if (!prova.publica) {
      try {
        await axios.get(
          `http://localhost:8080/api/prova/validarDatas?id=${idProva}`,
          { headers: AuthHeader() }
        );
      } catch (e) {
        alert(
          `Data inválida! Você só pode fazer essa prova entre ${prova.dataInicial} e  ${prova.dataFinal}`
        );
        return;
      }
    }
    if (prova.tempo > 0 && !prova.publica) {
      console.log("1");
      try {
        await axios.get(
          `http://localhost:8080/api/prova/validarResolucoes?id=${idProva}`,
          { headers: AuthHeader() }
        );
        const res = await axios.get(
          `http://localhost:8080/api/prova/iniciarProva?id=${idProva}`,
          { headers: AuthHeader() }
        );
        setTempoRestante(res.data.tempoRestante);
        if (res.data.temTempo == true) setComecou(true);
        else alert("Tempo Esgotado!");
      } catch (e) {
        alert("Numero máximo de tentativas atingido!");
      }
    } else if (prova.publica == true) {
      setComecou(true);
    } else {
      console.log("3");
      try {
        await axios.get(
          `http://localhost:8080/api/prova/validarResolucoes?id=${idProva}`,
          { headers: AuthHeader() }
        );
        setComecou(true);
      } catch (e) {
        alert("Numero máximo de tentativas atingido!");
      }
    }
  };

  const [tempoRestante, setTempoRestante] = useState(0);
  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.nome}</p>
        <InfosProva prova={prova} />
        {comecou ? (
          <>
            {prova.tempo > 0 && !prova.publica ? (
              <Countdown
                seconds={tempoRestante}
                finalizarProva={finalizarProva}
              />
            ) : (
              <></>
            )}
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
