import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  corrigirProva,
  setCorrecaoProva,
  setProvas,
} from "../../../application/provaSlice";
import AuthHeader from "../../../AuthContext";
import CorrigirQuestao from "../criar-prova/questoes/corrigirQuestao/CorrigirQuestao";
import InfosProva from "../provaCompleta/InfosProva";

export default function ProvaFeita() {
  const location = useLocation();
  const idProvaFeita = location.state.idProva;
  let history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    const fodase = async () => {
      const response = await axios.get(
        `http://localhost:8080/api/prova/buscarRID?id=${idProvaFeita}`,
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
    fodase();
  }, [dispatch]);

  const prova = useSelector((state) => state.provas.corrigirProva);
  const correcao = useSelector((state) => state.provas.provaCorrigida);

  const finalizarCorrecao = (e) => {
    e.preventDefault();
    let errado = false;

    for (var i = 0; i < correcao.questoes.length; i++) {
      if (
        correcao.questoes[i].notaQuestao < 0 ||
        correcao.questoes[i].notaQuestao > correcao.questoes[i].valorQuestao
      ) {
        errado = true;
        break;
      }
    }
    if (errado) {
      alert("Uma ou mais questões estão com uma nota inválida!");
    } else {
      dispatch(corrigirProva({ body: correcao }));
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
        <p className="criar-prova-titulo">{prova.nome}</p>
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
        <button
          className="botao-simples"
          onClick={() => history.push("/corrigir/buscarProva")}
        >
          Voltar
        </button>
        <button className="botao-simples" onClick={finalizarCorrecao}>
          Finalizar Correção
        </button>
      </div>
    </div>
  );
}
