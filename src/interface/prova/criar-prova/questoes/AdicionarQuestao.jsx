import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../../application/autenticacaoSlice";
import AuthHeader from "../../../../AuthContext";
import FiltroQuestoes from "../../../filtroBuscar/FiltroQuestoes";
import CriarQuestoes from "./criar-questao/CriarQuestoes";
import "./Questao.css";

export default function AdicionarQuestoes({ idsQuestoes }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [criar, setCriar] = useState(false);
  const [escolher, setEscolher] = useState(false);
  const dispatch = useDispatch();
  let history = useHistory();

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCriar(false);
    setEscolher(false);
  };

  const handleOpenCriar = () => {
    setOpen(false);
    setEscolher(false);
    setCriar(true);
  };

  const handleOpenEscolher = () => {
    setOpen(false);
    setEscolher(true);
    setCriar(false);
  };

  const [questoes, setQuestoes] = useState([]);
  const [quantidade, setQuantidade] = useState([]);

  const buscarFiltrado = async (nome, busca) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/questao/filtrar?enunciado=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}&multiplaEscolha=${busca.tipo}&publica=${busca.publica}` +
          stringQueryConteudos(busca.conteudos) +
          stringQueryQuestoes(idsQuestoes),
        { headers: AuthHeader() }
      );
      setQuestoes(response.data.questoes);
      setQuantidade(response.data.quantidade);
    } catch (error) {
      dispatch(logout({ ...{} }));
      history.push(`/login`);
    }
  };

  const stringQueryConteudos = (conteudos) => {
    var queryParam = "";
    if (conteudos.length > 0) {
      conteudos.map((cont) => (queryParam = queryParam + "&conteudos=" + cont));
    }
    return queryParam;
  };

  const stringQueryQuestoes = (ids) => {
    var queryParam = "";
    if (ids.length > 0) {
      ids.map((id) => (queryParam = queryParam + "&questoes=" + id));
    }
    return queryParam;
  };

  return (
    <div className="adicionar-questao">
      <button className="botao-simples" onClick={handleClickOpen}>
        {t("adicionar-questao")}
      </button>
      {open ? (
        <div className="escolher-opcao">
          <button className="botao-fechar" onClick={handleClose}>
            <i>
              <FontAwesomeIcon
                icon={faX}
                rel="noreferrer"
                className="icon-fechar"
              ></FontAwesomeIcon>
            </i>
          </button>
          <div className="opcoes">
            <button className="botao-simples" onClick={handleOpenCriar}>
              {t("criar-questao")}
            </button>
            <button className="botao-simples" onClick={handleOpenEscolher}>
              {t("buscar-questao")}
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      {criar ? <CriarQuestoes handleClose={handleClose} /> : <></>}
      {escolher ? (
        <FiltroQuestoes
          quantidade={quantidade}
          handleClose={handleClose}
          buscarFiltrado={buscarFiltrado}
          objetos={questoes}
          opcoesFiltro={[t("ordem-alfabetica"), t("data")]}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
