import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cadastrarNovaQuestao,
  setQuestao,
} from "../../../../../application/questaoSlice";
import BuscarConteudos from "../../buscar-conteudos/BuscarConteudos";
import CriarAlternativas from "./criar-alternativas/CriarAlternativas";
import "./CriarQuestoes.css";

export default function CriarQuestoes({ handleClose }) {
  const [publica, setPublica] = useState(true);
  const [dissertativa, setDissertativa] = useState(true);

  const mudarPrivacidade = (e) => {
    if (e.target.value === "true") {
      setPublica(true);
    } else {
      setPublica(false);
    }
    handleChange(e);
  };

  const mudarTipoQuestao = (e) => {
    if (e.target.value === "true") {
      setDissertativa(false);
    } else {
      setDissertativa(true);
    }
    handleChange(e);
  };
  const dispatch = useDispatch();

  const prova = useSelector((state) => state.provas.prova);

  const handleAdicionarAlternativa = (alt) => {
    dispatch(
      setQuestao({ ...questao, alternativas: questao.alternativas.concat(alt) })
    );
  };

  useEffect(() => {
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
  }, [dispatch]);

  const questao = useSelector((state) => state.questoes.questao);

  const handleChange = (e) => {
    const nome = e.target.name;
    const value = e.target.value;
    dispatch(setQuestao({ ...questao, [nome]: value }));
  };

  const validar = () => {
    if (
      questao.enunciado &&
      questao.valor > 0 &&
      questao.conteudos.length > 0
    ) {
      if (questao.multiplaEscolha) {
        if (questao.alternativas.length <= 1) {
          alert("Crie pelo menos duas alternativas");
          return false;
        } else {
          let certos = 0;
          for (var i = 0; i < questao.alternativas.length; i++) {
            if (
              questao.alternativas[i].correta == true ||
              questao.alternativas[i].correta == "true"
            ) {
              certos = certos + 1;
            }
          }
          if (certos != 1) {
            alert("é permitido apenas uma alternativa correta");
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (questao.resposta == "" || questao.resposta == null) {
          alert("Escreva a resposta");
          return false;
        } else {
          return true;
        }
      }
    } else {
      alert("preencha todos os campos");
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let questaoValida = validar();
    if (questaoValida == true) {
      let q = Object.assign({}, questao, { selected: false });
      q.editavel = true;
      dispatch(cadastrarNovaQuestao({ questao: q, prova: prova }));
      dispatch(
        setQuestao({
          ...questao,
          enunciado: "",
          multiplaEscolha: false,
          resposta: "",
          valor: 0,
          alternativas: [],
          conteudos: [],
          nomeConteudos: [],
        })
      );
      handleClose();
    }
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
          placeholder="Enunciado..."
          onChange={handleChange}
        ></input>
        <select
          name="publica"
          id="privacidade"
          className="select-simples"
          onChange={mudarPrivacidade}
        >
          <option value={true}>Pública</option>
          <option value={false}>Privada</option>
        </select>
      </div>
      <div className="mini-container">
        <BuscarConteudos
          tamanhoPagina={5}
          adicionarConteudos={adicionarConteudosQuestao}
        />
      </div>
      <div className="mini-container">
        <input
          type="number"
          min="0.1"
          name="valor"
          className="input-numero-simples"
          placeholder="Valor..."
          onChange={handleChange}
        ></input>
        <select
          name="multiplaEscolha"
          id="tipo-questao"
          className="select-simples"
          onChange={mudarTipoQuestao}
        >
          <option value={false}>Dissertativa</option>
          <option value={true}>Múltipla Escolha</option>
        </select>
      </div>
      {dissertativa ? (
        <>
          <textarea
            type="text"
            name="resposta"
            className="input-texto-grande"
            placeholder="Resposta..."
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
                      {alt.enunciado}{" "}
                      {alt.correta == true || alt.correta == "true"
                        ? "correta"
                        : "incorreta"}{" "}
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
        Criar Questão
      </button>
    </div>
  );
}
