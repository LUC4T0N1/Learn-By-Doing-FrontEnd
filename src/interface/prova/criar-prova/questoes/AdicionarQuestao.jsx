import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import "./Questao.css";
import CriarQuestoes from "./criar-questao/CriarQuestoes";
import FiltroQuestoes from "../../../filtroBuscar/FiltroQuestoes";
import axios from "axios";
import AuthHeader from "../../../../AuthContext";
import { useDispatch } from "react-redux";
import { logout } from "../../../../application/autenticacaoSlice";
import { useHistory } from "react-router-dom";

export default function AdicionarQuestoes() {
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
    /* todo enviar prop back */
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
          stringQueryConteudos(busca.conteudos),
        { headers: AuthHeader() }
      );
      console.log("res: " + JSON.stringify(response));
      setQuestoes(response.data);
      setQuantidade(response.data.length);
      console.log("quant: " + response.data.length);
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

  return (
    <div className="adicionar-questao">
      <button className="botao-simples" onClick={handleClickOpen}>
        Adicionar Questão
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
              Criar Nova Questão
            </button>
            <button className="botao-simples" onClick={handleOpenEscolher}>
              Buscar Nova Questão
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
          opcoesFiltro={["ordem alfabética", "data"]}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
