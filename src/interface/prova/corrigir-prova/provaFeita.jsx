import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AuthHeader from "../../../AuthContext";
import { setCorrecaoProva, setProvas } from "../../../application/provaSlice";
import CorrigirQuestao from "../criar-prova/questoes/corrigirQuestao/CorrigirQuestao";
import InfosProva from "../provaCompleta/InfosProva";

export default function ProvaFeita() {
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
  const idProvaFeita = obterIdProva();
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    if (idProvaFeita == 0) {
      history.push("/");
    }
    const ajustar = async () => {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL + `prova/buscarRID?id=${idProvaFeita}`,
        { headers: AuthHeader() }
      );
      const data = {
        corrigirProva: response.data,
        provaCorrigida: { idProvaRealizada: response.data.id, questoes: [] },
      };
      dispatch(setProvas({ ...data }));
      let questoes = [];
      response.data.provaDto.questoes.map((q) => {
        questoes = questoes.concat({
          notaQuestao: q.notaAluno,
          idQuestaoResolvida: q.idQuestaoResolvida,
          comentarioProfessor: q.comentario,
          valorQuestao: q.valor,
        });
      });
      dispatch(
        setCorrecaoProva({
          ...correcao,
          questoes: questoes,
          idProvaRealizada: idProvaFeita,
        })
      );
    };
    ajustar();
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.corrigirProva);
  const correcao = useSelector((state) => state.provas.provaCorrigida);
  const [sucesso, setSucesso] = useState(false);
  const [correcaoInvalida, setCorrecaoInvalida] = useState(false);
  const [erro, setErro] = useState(false);

  const finalizarCorrecao = async (e) => {
    e.preventDefault();
    let errado = false;

    for (var i = 0; i < correcao.questoes.length; i++) {
      if (
        correcao.questoes[i].notaQuestao == undefined ||
        correcao.questoes[i].notaQuestao < 0 ||
        correcao.questoes[i].notaQuestao === "" ||
        correcao.questoes[i].notaQuestao > correcao.questoes[i].valorQuestao
      ) {
        errado = true;
        break;
      }
    }
    if (errado) {
      setCorrecaoInvalida(true);
      setSucesso(false);
    } else {
      setCorrecaoInvalida(false);
      try {
        await axios.put(
          process.env.REACT_APP_SERVER_URL + `prova/corrigirDissertativa`,
          correcao,
          {
            headers: AuthHeader(),
          }
        );
        setSucesso(true);
        setErro(false);
      } catch (e) {
        setErro(true);
        setSucesso(false);
      }
    }
  };

  const atualizarNotaQuestao = (e, idQuestao) => {
    const nota = e.target.value;
    const notaQuestao = nota;
    let questoesCorrigidas = correcao.questoes;
    let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
    if (questoesCorrigidasDto.length == 0) {
      prova.provaDto.questoes.map((questao) => {
        if (!questao.multiplaEscolha) {
          let corr = {
            notaQuestao: 0,
            idQuestaoResolvida: questao.idQuestaoResolvida,
            comentarioProfessor: "",
          };
          questoesCorrigidasDto.push(corr);
        }
      });
    }
    let objIndex = questoesCorrigidasDto.findIndex(
      (obj) => obj.idQuestaoResolvida == idQuestao
    );
    questoesCorrigidasDto[objIndex].notaQuestao = notaQuestao;
    dispatch(
      setCorrecaoProva({ ...correcao, questoes: questoesCorrigidasDto })
    );
  };

  const atualizarComentarioQuestao = (e, idQuestao) => {
    const comentario = e.target.value;
    const comentarioQuestao = comentario;
    let questoesCorrigidas = correcao.questoes;
    let questoesCorrigidasDto = JSON.parse(JSON.stringify(questoesCorrigidas));
    if (questoesCorrigidasDto.length == 0) {
      prova.provaDto.questoes.map((questao) => {
        if (!questao.multiplaEscolha) {
          let corr = {
            notaQuestao: 0,
            idQuestaoResolvida: questao.idQuestaoResolvida,
            comentarioProfessor: "",
          };
          questoesCorrigidasDto.push(corr);
        }
      });
    }
    let objIndex = questoesCorrigidasDto.findIndex(
      (obj) => obj.idQuestaoResolvida == idQuestao
    );
    questoesCorrigidasDto[objIndex].comentarioProfessor = comentarioQuestao;
    dispatch(
      setCorrecaoProva({ ...correcao, questoes: questoesCorrigidasDto })
    );
  };

  return (
    <div className="criar-prova">
      <div className="formulario-criar-prova">
        <p className="criar-prova-titulo">{prova.provaDto.nome}</p>
        <p className="nome-aluno">{prova.nomeAluno}</p>
        <InfosProva prova={prova.provaDto} />
        {prova.provaDto.questoes.map((questao, index) => (
          <CorrigirQuestao
            key={index}
            qr={
              correcao.questoes.filter((q) => {
                return q.idQuestaoResolvida === questao.idQuestaoResolvida;
              })[0]
            }
            questao={{
              idQuestaoResolvida: questao.idQuestaoResolvida,
              numeroQuestao: index + 1,
              enunciado: questao.enunciado,
              publica: questao.publica,
              multiplaEscolha: questao.multiplaEscolha,
              id: questao.id,
              valor: questao.valor,
              resposta: questao.resposta,
              respostaAluno: questao.respostaAluno,
              notaAluno: questao.notaAluno,
              alternativas: questao.alternativas,
            }}
            atualizarComentarioQuestao={atualizarComentarioQuestao}
            atualizarNotaQuestao={atualizarNotaQuestao}
          />
        ))}
        <div className="footer-buttons">
          <div className="botao-esquerda">
            <button
              className="botao-fim"
              onClick={() => history.push("/toCorrect/searchTest")}
            >
              {t("voltar")}
            </button>
          </div>
          <div className="botao-direita">
            {erro ? (
              <p className="error-message">{t("erro-generico")}</p>
            ) : (
              <></>
            )}
            {correcaoInvalida ? (
              <p className="error-message">{t("erro-questao-invalida")}</p>
            ) : (
              <></>
            )}
            {sucesso ? (
              <p className="success-message">{t("aviso-prova-corrigida")}</p>
            ) : (
              <></>
            )}
            <button className="botao-fim" onClick={finalizarCorrecao}>
              {t("finalizar-correcao")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
