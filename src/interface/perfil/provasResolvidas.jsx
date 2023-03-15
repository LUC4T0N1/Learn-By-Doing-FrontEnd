import axios from "axios";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import AuthHeader from "../../AuthContext";
import FiltroBuscar from "../filtroBuscar/FiltroBuscar";

function ProvasResolvidas() {
  const { t } = useTranslation();
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      process.env.REACT_APP_SERVER_URL +
        `prova/buscarResolucoesPorUsuario?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provasResolvidas);
    setQuantidade(res.data.quantidade);
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={t("provas")}
        opcoesFiltro={[t("data")]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={3}
      />
    </>
  );
}

export default ProvasResolvidas;
