import { faCheck, faX, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  cadastrarNovaQuestao,
  setQuestao,
} from "../../../../../application/questaoSlice";
import BuscarConteudos from "../../buscar-conteudos/BuscarConteudos";
import CriarAlternativas from "./criar-alternativas/CriarAlternativas";
import "./CriarQuestoes.css";

export default function CriarQuestoes({ handleClose }) {
  const { t } = useTranslation();
  const [publica, setPublica] = useState(false);
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
        publica: false,
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
        <textarea
          type="text"
          name="enunciado"
          className="enunciado-questao"
          placeholder={t("enunciado...")}
          onChange={handleChange}
        ></textarea>
      </div>
      <div className="mini-container3">
        <BuscarConteudos
          e2={true}
          tamanhoPagina={5}
          adicionarConteudos={adicionarConteudosQuestao}
        />
      </div>
      <div className="mini-container2">
        <input
          type="number"
          min="0.1"
          name="valor"
          className="input-numero-simples"
          placeholder={t("valor...")}
          onChange={handleChange}
        ></input>
        <select
          name="multiplaEscolha"
          id="tipo-questao"
          className="select-simples"
          onChange={mudarTipoQuestao}
        >
          <option value={false}>{t("dissertativa")}</option>
          <option value={true}>{t("multipla-escolha")}</option>
        </select>
        <select
          name="publica"
          id="privacidade"
          className="select-simples"
          onChange={mudarPrivacidade}
        >
          <option value={false}>{t("privada")}</option>
          <option value={true}>{t("publica")}</option>
        </select>
      </div>
      {dissertativa ? (
        <>
          <textarea
            type="text"
            name="resposta"
            className="input-texto-grande"
            placeholder={t("resposta...")}
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
              <h3 className="zero-itens">{t("zero-alternativas")}</h3>
            )}
          </div>
          <CriarAlternativas
            handleAdicionarAlternativa={handleAdicionarAlternativa}
          />
        </>
      )}
      <button className="botao-simples" onClick={handleSubmit}>
        {t("criar-questao")}
      </button>
      {erro.erro ? <p className="error-message">{erro.mensagem}</p> : <></>}
    </div>
  );
}
