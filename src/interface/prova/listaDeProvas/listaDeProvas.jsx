import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";

function ListaDeProvas() {
  const { t } = useTranslation();
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);
  const location = useLocation();
  const obterIdConteudo = () => {
    try {
      let id = location.state.idConteudo;
      return id;
    } catch (e) {
      return 0;
    }
  };
  const idConteudo = obterIdConteudo();
  let history = useHistory();

  const dispatch = useDispatch();

  useEffect(() => {
    if (idConteudo == 0) {
      history.push("/");
    }
  }, [dispatch]);

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        `prova/buscarPorConteudo?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&idConteudo=${idConteudo}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    console.log("aaaa " + JSON.stringify(res.data));
    setProvas(res.data.provas);
    setQuantidade(res.data.quantidade);
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={t("provas")}
        opcoesFiltro={[
          t("ordem-alfabetica"),
          t("tamanho"),
          t("popularidade"),
          t("dificuldade"),
        ]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={2}
      />
    </>
  );
}

export default ListaDeProvas;
