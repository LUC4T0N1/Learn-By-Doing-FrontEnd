import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../../application/autenticacaoSlice";
import AuthHeader from "../../../../AuthContext";
import FiltroConteudos from "../../../filtroBuscar/FiltroConteudos";
import Tag from "../../../filtroBuscar/Tag";
import "./BuscarConteudos.css";

export default function BuscarConteudos({ tamanhoPagina, adicionarConteudos }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [conteudosSelecionados, setConteudosSelecionados] = useState([]);

  const addConteudo = (nome, id) => {
    var selecionado = conteudosSelecionados.filter((cont) => cont.nome == nome);
    if (selecionado.length == 0) {
      setConteudosSelecionados(
        conteudosSelecionados.concat({ nome: nome, id: id })
      );
    } else {
      setConteudosSelecionados(
        conteudosSelecionados.filter((cont) => cont.nome != nome)
      );
    }
    adicionarConteudos(id, nome);
  };

  const [conteudo, setConteudo] = useState({ nome: "" });

  const handleChangeCriarConteudo = (e) => {
    const value = e.target.value;
    setConteudo({ ...conteudo, nome: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (conteudo.nome !== "") {
      try {
        const res = await axios.post(
          `http://localhost:8080/api/conteudo`,
          conteudo,
          { headers: AuthHeader() }
        );
        addConteudo(res.data.nome, res.data.idConteudo);
        setConteudo({ ...conteudo, nome: "" });
        setOpen(false);
      } catch {
        setErro({ erro: true, mensagem: t("conteudo-aviso-1") });
      }
    } else {
      setErro({ erro: true, mensagem: t("conteudo-aviso-2") });
    }
  };
  const [open, setOpen] = React.useState(false);
  const [openEscolher, setOpenEscolher] = React.useState(false);

  const handleClickOpen = (e) => {
    e.preventDefault();
    setOpen(true);
    setOpenEscolher(false);
  };

  const handleClickOpenEscolher = (e) => {
    e.preventDefault();
    setOpenEscolher(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenEscolher(false);
  };

  const [quantidade, setQuantidade] = useState(0);
  const [conteudos, setConteudos] = useState([]);
  let history = useHistory();

  const buscarFiltrado = async (nome, busca) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/conteudo/filtro?nome=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
        { headers: AuthHeader() }
      );
      setConteudos(response.data.conteudos);
      setQuantidade(response.data.quantidade);
    } catch (error) {
      dispatch(logout({ ...{} }));
      history.push(`/login`);
    }
  };

  const [erro, setErro] = useState({ erro: false, mensagem: "" });

  return (
    <div className="buscar-conteudos">
      <div className="conteudos-selecionados">
        {conteudosSelecionados.map((c) => (
          <Tag id={c.id} nome={c.nome} handleRemove={addConteudo} />
        ))}
      </div>

      {open ? (
        <>
          <div className="criar-conteudo">
            <button className="botao-fechar" onClick={handleClose}>
              <i>
                <FontAwesomeIcon
                  icon={faX}
                  rel="noreferrer"
                  className="icon-fechar"
                ></FontAwesomeIcon>
              </i>
            </button>
            <div className="conteudo">
              <input
                type="text"
                name="nome"
                className="input-texto-simples"
                placeholder={t("conteudo...")}
                onChange={handleChangeCriarConteudo}
              ></input>
              <button className="botao-simples" onClick={handleSubmit}>
                {t("criar")}
              </button>
              {erro.erro ? (
                <p className="error-message">{erro.mensagem}</p>
              ) : (
                <></>
              )}
            </div>
          </div>
        </>
      ) : (
        <button className="botao-simples" onClick={handleClickOpen}>
          {t("criar-conteudo")}
        </button>
      )}

      {openEscolher ? (
        <FiltroConteudos
          tamanhoPagina={tamanhoPagina}
          handleClose={handleClose}
          titulo={t("escolher-conteudos")}
          opcoesFiltro={[t("ordem-alfabetica"), t("numero-provas")]}
          buscarFiltrado={buscarFiltrado}
          objetos={conteudos}
          quantidade={quantidade}
          tipo={1}
          conteudosSelecionados={conteudosSelecionados}
          addConteudo={addConteudo}
        />
      ) : (
        <button className="botao-simples" onClick={handleClickOpenEscolher}>
          {t("escolher-conteudos")}
        </button>
      )}
    </div>
  );
}
