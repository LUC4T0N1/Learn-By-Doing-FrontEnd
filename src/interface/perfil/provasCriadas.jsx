import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../application/autenticacaoSlice";
import AuthHeader from "../../AuthContext";
import FiltroBuscar from "../filtroBuscar/FiltroBuscar";

function ProvasCriadas() {
  const { t } = useTranslation();
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);

  const dispatch = useDispatch();
  let history = useHistory();

  const buscarFiltrado = async (nome, busca) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/prova/buscarPU?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
        { headers: AuthHeader() }
      );
      setProvas(res.data.provas);
      setQuantidade(res.data.quantidade);
    } catch (error) {
      dispatch(logout({ ...{} }));
      history.push(`/login`);
    }
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={t("provas")}
        opcoesFiltro={[
          t("data"),
          t("ordem-alfabetica"),
          t("tamanho"),
          t("popularidade"),
          t("dificuldade"),
        ]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={4}
      />
    </>
  );
}

export default ProvasCriadas;
