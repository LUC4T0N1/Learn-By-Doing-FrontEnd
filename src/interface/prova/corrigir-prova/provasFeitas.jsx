import axios from "axios";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";
function ProvasFeitas() {
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);
  const location = useLocation();
  const idProva = location.state.idProva;

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      `http://localhost:8080/api/prova/buscarResolucoes?id=${idProva}&pagina=${busca.pagina}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provasCorrigir);
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
        tipo={6}
      />
    </>
  );
}

export default ProvasFeitas;
