import { faCheck, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setProva } from "../../../../../application/provaSlice";
import { setQuestao } from "../../../../../application/questaoSlice";
import AuthHeader from "../../../../../AuthContext";
import BuscarConteudosEditarQuestao from "../../buscar-conteudos/BuscarConteudosEditarQuestao";
import CriarAlternativas from "../criar-questao/criar-alternativas/CriarAlternativas";

export default function EditarQuestoes({ handleClose }) {
  const { t } = useTranslation();
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

  const validar = () => {
    if (!questao.enunciado) {
      setErro({
        erro: true,
        mensagem: t("questao-aviso-1"),
      });
      return false;
    } else if (questao.valor <= 0) {
      setErro({
        erro: true,
        mensagem: t("questao-aviso-2"),
      });
      return false;
    } else if (questao.conteudos.length <= 0) {
      setErro({
        erro: true,
        mensagem: t("questao-aviso-3"),
      });
      return false;
    } else {
      if (questao.multiplaEscolha) {
        if (questao.alternativas.length <= 1) {
          setErro({
            erro: true,
            mensagem: t("questao-aviso-4"),
          });
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
            setErro({
              erro: true,
              mensagem: t("questao-aviso-5"),
            });
            return false;
          } else {
            return true;
          }
        }
      } else {
        if (questao.resposta == "" || questao.resposta == null) {
          setErro({
            erro: true,
            mensagem: t("questao-aviso-6"),
          });
          return false;
        } else {
          return true;
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    let questaoValida = validar();
    if (questaoValida == true) {
      const res = await axios.put(
        process.env.REACT_APP_SERVER_URL + `questao`,
        questao,
        {
          headers: AuthHeader(),
        }
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

  const [erro, setErro] = useState({ erro: false, mensagem: "" });

  return (
    <div className="criar-questoes">
      <button className="botao-fechar-2" onClick={handleClose}>
        <i>
          <FontAwesomeIcon
            icon={faX}
            rel="noreferrer"
            className="icon-fechar"
          ></FontAwesomeIcon>
        </i>
      </button>
      <div className="mini-container2">
        <input
          type="text"
          name="enunciado"
          className="input-texto-simples"
          value={questao.enunciado}
          placeholder={t("enunciado...")}
          onChange={handleChange}
        />
      </div>
      <div className="mini-container">
        <BuscarConteudosEditarQuestao
          tamanhoPagina={5}
          adicionarConteudos={adicionarConteudosQuestao}
          conteudosPreSelecionados={getConteudosPreSelecionados}
        />
      </div>
      <div className="mini-container2">
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
                {t("dissertativa")}
              </option>
            </>
          ) : (
            <>
              <option selected="selected" value={true}>
                {t("multipla-escolha")}
              </option>
            </>
          )}
        </select>
        <select
          name="publica"
          id="privacidade"
          className="select-simples"
          onChange={handleChange}
        >
          {questao.publica == true || questao.publica == "true" ? (
            <>
              <option selected="selected" value={true}>
                {t("publica")}
              </option>
              <option value={false}>{t("privada")}</option>
            </>
          ) : (
            <>
              <option value={true}>{t("publica")}</option>
              <option selected="selected" value={false}>
                {t("privada")}
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
            placeholder={t("resposta...")}
            value={questao.resposta}
            onChange={handleChange}
          ></textarea>
        </>
      ) : (
        <>
          <div>
            {questao.alternativas.length !== 0 ? (
              <div className="alternativas">
                {questao.alternativas.map((alt) => (
                  <div className="alternativa">
                    <h3>
                      {questao.alternativas.findIndex((a) => a === alt) + 1}
                      {" - "}
                      {alt.correta == true || alt.correta == "true" ? (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="alt-icon-verdadeiro"
                        ></FontAwesomeIcon>
                      ) : (
                        <FontAwesomeIcon
                          icon={faXmark}
                          className="alt-icon-falso"
                        ></FontAwesomeIcon>
                      )}{" "}
                      {alt.enunciado}
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
              <h3> {t("zero-alternativas")}</h3>
            )}
          </div>
          <CriarAlternativas
            handleAdicionarAlternativa={handleAdicionarAlternativa}
          />
        </>
      )}
      <button className="botao-simples" onClick={handleSubmit}>
        {t("editar-questao")}
      </button>
      {erro.erro ? <p className="error-message">{erro.mensagem}</p> : <></>}
    </div>
  );
}
