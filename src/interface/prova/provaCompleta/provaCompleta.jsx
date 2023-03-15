import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getProvaFazer,
  setRealizarProva,
} from "../../../application/provaSlice";
import AuthHeader from "../../../AuthContext";
import PopUp from "../../popup/PopUp";
import "../criar-prova/criarProva.css";
import ResponderQuestao from "../criar-prova/questoes/responder-questao/ResponderQuestao";
import Countdown from "./Countdown";
import InfosProva from "./InfosProva";

export default function ProvaCompleta() {
  const { t } = useTranslation();
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

  const finalizarProva = async (msg) => {
    await axios.post(
      process.env.REACT_APP_SERVER_URL + `prova/realizar`,
      prova,
      {
        headers: AuthHeader(),
      }
    );
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
    setPopup({
      mensagem: msg,
      mensagemFuncao: t("voltar-home"),
    });
    setSucesso(false);
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
          process.env.REACT_APP_SERVER_URL + `prova/validarDatas?id=${idProva}`,
          { headers: AuthHeader() }
        );
      } catch (e) {
        setPopup({
          mensagem:
            t("data-invalida") + prova.dataInicial + t("e") + prova.dataFinal,
          mensagemFuncao: t("voltar-home"),
        });
        setSucesso(false);
        return;
      }
    }
    if (prova.tempo > 0 && !prova.publica) {
      try {
        await axios.get(
          process.env.REACT_APP_SERVER_URL +
            `prova/validarResolucoes?id=${idProva}`,
          { headers: AuthHeader() }
        );
        const res = await axios.get(
          process.env.REACT_APP_SERVER_URL + `prova/iniciarProva?id=${idProva}`,
          { headers: AuthHeader() }
        );
        setTempoRestante(res.data.tempoRestante);
        if (res.data.temTempo == true) {
          setComecou(true);
        } else {
          setPopup({
            mensagem: t("tempo-esgotado"),
            mensagemFuncao: t("voltar-home"),
          });
          setSucesso(false);
        }
      } catch (e) {
        setPopup({
          mensagem: t("maximo-tentativas"),
          mensagemFuncao: t("voltar-home"),
        });
        setSucesso(false);
      }
    } else if (prova.publica == true) {
      setComecou(true);
    } else {
      try {
        await axios.get(
          process.env.REACT_APP_SERVER_URL +
            `prova/validarResolucoes?id=${idProva}`,
          { headers: AuthHeader() }
        );
        setComecou(true);
      } catch (e) {
        setPopup({
          mensagem: t("maximo-tentativas"),
          mensagemFuncao: t("voltar-home"),
        });
        setSucesso(false);
      }
    }
  };

  const [sucesso, setSucesso] = useState(true);
  const [popup, setPopup] = useState({
    mensagem: "",
    mensagemFuncao: "",
  });

  function toHome() {
    history.push(`/`);
    setSucesso(true);
  }

  const [tempoRestante, setTempoRestante] = useState(0);
  return (
    <>
      {!sucesso ? (
        <>
          <PopUp
            mensagem={popup.mensagem}
            funcao={toHome}
            mensagemFuncao={popup.mensagemFuncao}
          />
        </>
      ) : (
        <div className="criar-prova">
          <div className="formulario-criar-prova">
            <p className="criar-prova-titulo">{prova.nome}</p>
            <InfosProva prova={prova} />
            {comecou ? (
              <>
                {prova.tempo > 0 && !prova.publica ? (
                  <Countdown
                    seconds={tempoRestante}
                    finalizarProva={() =>
                      finalizarProva(t("tempo-esgotado-salvo"))
                    }
                  />
                ) : (
                  <></>
                )}
                {prova.questoes.map((questao, index) => (
                  <ResponderQuestao
                    numeroQuestao={index + 1}
                    questao={questao}
                    atualizarRespostaQuestao={atualizarRespostaQuestao}
                  />
                ))}
                <button
                  className="botao-simples"
                  onClick={() => finalizarProva(t("prova-enviada"))}
                >
                  {t("finalizar-prova")}
                </button>
              </>
            ) : (
              <>
                <button className="botao-simples" onClick={comecarProva}>
                  {t("comecar-prova")}
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
