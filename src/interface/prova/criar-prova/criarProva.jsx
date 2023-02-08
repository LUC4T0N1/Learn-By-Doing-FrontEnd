import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { cadastrarNovaProva, setProva } from "../../../application/provaSlice";
import PopUp from "../../popup/PopUp";
import BuscarConteudos from "./buscar-conteudos/BuscarConteudos";
import "./criarProva.css";
import InfosBasicas from "./infos-basicas/InfosBasicas";
import AdicionarQuestoes from "./questoes/AdicionarQuestao";
import VisualizarQuestoesCriadas from "./questoes/visualizar-questoes/VisualizarQuestoesCriadas";

function CriarProva() {
  const dispatch = useDispatch();
  const prova = useSelector((state) => state.provas.prova);

  const handleChange = (e) => {
    const nome = e.target.name;
    let value = e.target.value;
    if (nome === "tentativas") value = Math.floor(value);
    dispatch(setProva({ ...prova, [nome]: value }));
  };

  const adicionarConteudosProva = (id) => {
    var selecionado = prova.conteudos.filter((cont) => cont == id);
    if (selecionado.length == 0) {
      dispatch(setProva({ ...prova, conteudos: prova.conteudos.concat(id) }));
    } else {
      dispatch(
        setProva({
          ...prova,
          conteudos: prova.conteudos.filter((cont) => cont != id),
        })
      );
    }
  };

  const [erro, setErro] = useState({ erro: false, mensagem: "" });

  const handleSubmit = (e) => {
    let errado = false;
    for (var i = 0; i < prova.questoes.length; i++) {
      if (prova.questoes[i].valor <= 0) {
        errado = true;
        break;
      }
    }
    if (prova.questoes.length == 0) {
      setErro({
        erro: true,
        mensagem: "A prova deve ter pelo menos uma questao!",
      });
    } else if (errado) {
      setErro({
        erro: true,
        mensagem: "Uma ou mais questões estão com valor inválida!",
      });
    } else if (
      (prova.publica == false || prova.publica == "false") &&
      prova.tentativas <= 0
    ) {
      setErro({
        erro: true,
        mensagem: "A prova deve permitir pelo menos uma tentativa!",
      });
    } else {
      if (!prova.nome) {
        setErro({
          erro: true,
          mensagem: "Digite o título da prova!",
        });
      } else if (prova.conteudos.length <= 0) {
        setErro({
          erro: true,
          mensagem: "A prova deve conter pelo menos um conteúdo!",
        });
      } else {
        const idQuestoes = prova.questoes.map((quest) => quest.id);
        dispatch(
          cadastrarNovaProva({
            ...prova,
            idsQuestoes: idQuestoes,
            quantidadeQuestoes: idQuestoes.length,
          })
        );
        setSucesso(true);
      }
    }
  };

  const obterValorTotal = () => {
    let valor = parseInt(0);
    prova.questoes.map((q) => (valor = valor + parseFloat(q.valor)));
    return valor;
  };

  let history = useHistory();
  const [sucesso, setSucesso] = useState(false);
  function toHome() {
    history.push(`/`);
    setSucesso(true);
  }

  return (
    <>
      {sucesso ? (
        <>
          <PopUp
            mensagem="Prova criada com sucesso!"
            funcao={toHome}
            mensagemFuncao="Voltar para Home"
          />
        </>
      ) : (
        <div className="criar-prova">
          <div className="formulario-criar-prova">
            <p className="criar-prova-titulo">Criar Prova</p>
            <InfosBasicas handleChange={handleChange} />
            <BuscarConteudos
              tamanhoPagina={5}
              adicionarConteudos={adicionarConteudosProva}
            />
            {prova.questoes.length > 0 ? (
              prova.questoes.map((questao, index) => (
                <VisualizarQuestoesCriadas
                  key={index}
                  questao={questao}
                  podeRemover={true}
                  numeroQuestao={index + 1}
                />
              ))
            ) : (
              <h1>Nenhuma Questão Adicionada</h1>
            )}
            <div className="footer-criar-prova">
              <div className="infos-prova-footer">
                <p>Valor Total: {obterValorTotal()}</p>
                <p>Questões: {prova.questoes.length}</p>
              </div>
              <AdicionarQuestoes
                idsQuestoes={prova.questoes.map((quest) => quest.id)}
              />
              <div className="botao-criar-footer">
                <button className="botao-simples" onClick={handleSubmit}>
                  Criar Prova
                </button>
                {erro.erro ? (
                  <p className="error-message">{erro.mensagem}</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CriarProva;
