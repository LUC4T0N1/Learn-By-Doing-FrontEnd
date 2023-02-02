import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";

function ListaDeProvas() {
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);
  const location = useLocation();
  const idConteudo = location.state.idConteudo;

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      `http://localhost:8080/api/prova/buscarPorConteudo?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&idConteudo=${idConteudo}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provas);
    setQuantidade(res.data.quantidade);
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={"Provas"}
        opcoesFiltro={["Ordem Alfabética", "Tamanho", "Popularidade"]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={2}
      />
    </>
  );
}

export default ListaDeProvas;
