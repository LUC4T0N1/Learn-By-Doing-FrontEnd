import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { cadastrarNovaProva, setProva } from "../../../application/provaSlice";
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

  const handleSubmit = (e) => {
    console.log("AAAA " + prova.tentativas);
    e.preventDefault();

    let errado = false;

    for (var i = 0; i < prova.questoes.length; i++) {
      if (prova.questoes[i].valor <= 0) {
        errado = true;
        break;
      }
    }
    if (prova.questoes.length == 0) {
      alert("A prova deve ter pelo menos uma questao!");
    } else if (errado) {
      alert("Uma ou mais questões estão com valor inválida!");
    } else if (
      (prova.publica == false || prova.publica == "false") &&
      prova.tentativas <= 0
    ) {
      alert("A prova deve permitir pelo menos uma tentativa!");
    } else {
      if (prova.nome && prova.conteudos.length > 0) {
        const idQuestoes = prova.questoes.map((quest) => quest.id);
        dispatch(
          cadastrarNovaProva({
            ...prova,
            idsQuestoes: idQuestoes,
            quantidadeQuestoes: idQuestoes.length,
          })
        );
      } else {
        alert("preencha todos os campos");
      }
    }
  };

  const obterValorTotal = () => {
    let valor = parseInt(0);
    prova.questoes.map((q) => (valor = valor + parseFloat(q.valor)));
    return valor;
  };

  return (
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default CriarProva;
