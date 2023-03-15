import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";

function ProvasFeitas() {
  const { t } = useTranslation();
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);
  const location = useLocation();
  const obterIdProva = () => {
    try {
      let id = location.state.idProva;
      return id;
    } catch (e) {
      return 0;
    }
  };
  const dispatch = useDispatch();
  let history = useHistory();
  const idProva = obterIdProva();

  useEffect(() => {
    if (idProva == 0) {
      history.push("/");
    }
  }, [dispatch]);

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        `prova/buscarResolucoes?id=${idProva}&pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provasCorrigir);
    setQuantidade(res.data.quantidade);
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={t("aluno")}
        opcoesFiltro={[
          t("data"),
          t("ordem-alfabetica"),
          t("nota"),
          t("corrigida"),
        ]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={6}
      />
    </>
  );
}

export default ProvasFeitas;
