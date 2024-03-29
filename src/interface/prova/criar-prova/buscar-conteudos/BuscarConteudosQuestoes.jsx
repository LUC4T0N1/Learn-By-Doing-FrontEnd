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

export default function BuscarConteudosQuestoes({
  tamanhoPagina,
  adicionarConteudos,
}) {
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

  const [openEscolher, setOpenEscolher] = React.useState(false);

  const handleClickOpenEscolher = (e) => {
    e.preventDefault();
    setOpenEscolher(true);
  };

  const handleClose = () => {
    setOpenEscolher(false);
  };

  const [quantidade, setQuantidade] = useState(0);
  const [conteudos, setConteudos] = useState([]);
  let history = useHistory();

  const buscarFiltrado = async (nome, busca) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `conteudo/filtro?nome=${nome}&pagina=${busca.pagina}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
        { headers: AuthHeader() }
      );
      setConteudos(response.data.conteudos);
      setQuantidade(response.data.quantidade);
    } catch (error) {
      dispatch(logout({ ...{} }));
      history.push(`/login`);
    }
  };

  return (
    <div className="buscar-conteudos">
      <div className="conteudos-selecionados">
        {conteudosSelecionados.map((c) => (
          <Tag id={c.id} nome={c.nome} handleRemove={addConteudo} />
        ))}
      </div>
      {openEscolher ? (
        <FiltroConteudos
          e2={true}
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
