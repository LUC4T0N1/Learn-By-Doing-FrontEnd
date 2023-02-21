import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";

function CorrigirProva() {
  const { t } = useTranslation();
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      `http://localhost:8080/api/prova/buscarPU?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provas);
    setQuantidade(res.data.quantidade);
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
        tipo={5}
      />
    </>
  );
}

export default CorrigirProva;
