import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProva } from "../../../../../application/provaSlice";
import { setQuestao } from "../../../../../application/questaoSlice";
import AuthHeader from "../../../../../AuthContext";
import BuscarConteudosEditarQuestao from "../../buscar-conteudos/BuscarConteudosEditarQuestao";
import CriarAlternativas from "../criar-questao/criar-alternativas/CriarAlternativas";

export default function EditarQuestoes({ handleClose }) {
  const prova = useSelector((state) => state.provas.prova);
  const questao = useSelector((state) => state.questoes.questao);

  const dispatch = useDispatch();

  const handleAdicionarAlternativa = (alt) => {
    dispatch(
      setQuestao({ ...questao, alternativas: questao.alternativas.concat(alt) })
    );
  };

  const removerAlternativa = (alt) => {
    let alts = questao.alternativas.map((item) =>
      Object.assign({}, item, { selected: false })
    );
    alts = alts.filter(function (a) {
      return a.enunciado != alt.enunciado;
    });
    dispatch(setQuestao({ ...questao, alternativas: alts }));
  };

  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    dispatch(setQuestao({ ...questao, [nome]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (questao.enunciado) {
      const res = await axios.put(
        `http://localhost:8080/api/questao`,
        questao,
        { headers: AuthHeader() }
      );
      let questoes = prova.questoes.map((item) =>
        Object.assign({}, item, { selected: false })
      );
      let q = questoes.findIndex((obj) => obj.id == questao.id);
      questoes[q] = questao;
      dispatch(
        setProva({
          ...prova,
          questoes: questoes,
        })
      );
      dispatch(
        setQuestao({
          ...questao,
          enunciado: "",
          multiplaEscolha: false,
          resposta: "",
          valor: 0,
          alternativas: [],
        })
      );
      handleClose();
    } else {
      alert("preencha todos os campos");
    }
  };

  const adicionarConteudosQuestao = (id, nome) => {
    var selecionado = questao.conteudos.filter((cont) => cont == id);

    if (selecionado.length == 0) {
      dispatch(
        setQuestao({
          ...questao,
          conteudos: questao.conteudos.concat(id),
          nomeConteudos: questao.nomeConteudos.concat(nome),
        })
      );
    } else {
      dispatch(
        setQuestao({
          ...questao,
          conteudos: questao.conteudos.filter((cont) => cont != id),
          nomeConteudos: questao.nomeConteudos.filter((cont) => cont != nome),
        })
      );
    }
  };

  const getConteudosPreSelecionados = () => {
    let array = [];
    questao.conteudos.map((cont, index) => {
      array = array.concat({ id: cont, nome: questao.nomeConteudos[index] });
    });
    return array;
  };

  return (
    <div className="criar-questoes">
      <button className="botao-fechar" onClick={handleClose}>
        <i>
          <FontAwesomeIcon
            icon={faX}
            rel="noreferrer"
            className="icon-fechar"
          ></FontAwesomeIcon>
        </i>
      </button>
      <div className="mini-container">
        <input
          type="text"
          name="enunciado"
          className="input-texto-simples"
          value={questao.enunciado}
          placeholder="Enunciado..."
          onChange={handleChange}
        />
        <select
          name="publica"
          id="privacidade"
          className="select-simples"
          onChange={handleChange}
        >
          {questao.publica == true || questao.publica == "true" ? (
            <>
              <option selected="selected" value={true}>
                Pública
              </option>
              <option value={false}>Privada</option>
            </>
          ) : (
            <>
              <option value={true}>Pública</option>
              <option selected="selected" value={false}>
                Privada
              </option>
            </>
          )}
        </select>
      </div>
      <div className="mini-container">
        <BuscarConteudosEditarQuestao
          tamanhoPagina={5}
          adicionarConteudos={adicionarConteudosQuestao}
          conteudosPreSelecionados={getConteudosPreSelecionados}
        />
      </div>
      <div className="mini-container">
        <input
          type="number"
          name="valor"
          className="input-numero-simples"
          value={questao.valor}
          onChange={handleChange}
        ></input>
        <select
          name="multiplaEscolha"
          id="tipo-questao"
          className="select-simples"
          onChange={handleChange}
          disabled
        >
          {!questao.multiplaEscolha == true ||
          !questao.multiplaEscolha == "true" ? (
            <>
              <option selected="selected" value={false}>
                Dissertativa
              </option>
            </>
          ) : (
            <>
              <option selected="selected" value={true}>
                Múltipla Escolha
              </option>
            </>
          )}
        </select>
      </div>
      {!questao.multiplaEscolha == true ||
      !questao.multiplaEscolha == "true" ? (
        <>
          <textarea
            type="text"
            name="resposta"
            className="input-texto-grande"
            placeholder="Resposta..."
            value={questao.resposta}
            onChange={handleChange}
          ></textarea>
        </>
      ) : (
        <>
          <div>
            {questao.alternativas.length !== 0 ? (
              <div style={{ display: "block", flexWrap: "wrap" }}>
                {questao.alternativas.map((alt) => (
                  <div className="alternativa">
                    <h3>
                      {" "}
                      {questao.alternativas.findIndex((a) => a === alt) +
                        1}{" "}
                      {alt.enunciado} {alt.correta ? "correta" : "incorreta"}{" "}
                    </h3>
                    <button
                      className="remover-alternativa-botao"
                      onClick={() => removerAlternativa(alt)}
                    >
                      -
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <h3> Nenhuma Alternativa Por Enquanto </h3>
            )}
          </div>
          <CriarAlternativas
            handleAdicionarAlternativa={handleAdicionarAlternativa}
          />
        </>
      )}
      <button className="botao-simples" onClick={handleSubmit}>
        Editar Questão
      </button>
    </div>
  );
}
