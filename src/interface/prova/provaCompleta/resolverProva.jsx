import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  realizarProva,
  setRealizarProva,
} from "../../../application/provaSlice";
import ResponderQuestaoDissertativa from "./responderQuestaoDissertativa";
import ResponderQuestaoMultiplaEscolha from "./responderQuestaoMultiplaEscolha";

export default function ResolverProva(props) {
  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.realizarProva);
  const finalizarProva = (e) => {
    dispatch(realizarProva({ ...prova }));
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

  return (
    <div>
      {prova.questoes.map((questao, index) =>
        questao.multiplaEscolha ? (
          <ResponderQuestaoMultiplaEscolha
            key={index}
            questao={{
              numeroQuestao: index + 1,
              enunciado: questao.enunciado,
              idQuestao: questao.id,
              alternativas: questao.alternativas,
              valor: questao.valor,
            }}
            atualizarRespostaQuestao={props.atualizarRespostaQuestao}
          />
        ) : (
          <ResponderQuestaoDissertativa
            key={index}
            questao={{
              numeroQuestao: index + 1,
              enunciado: questao.enunciado,
              idQuestao: questao.id,
              valor: questao.valor,
            }}
            atualizarRespostaQuestao={props.atualizarRespostaQuestao}
          />
        )
      )}
      <CardActions style={{ justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{ width: "40%" }}
          onClick={finalizarProva}
        >
          Finalizar Prova
        </Button>
      </CardActions>
    </div>
  );
}
