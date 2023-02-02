import axios from "axios";
import React, { useState } from "react";
import AuthHeader from "../../AuthContext";
import FiltroBuscar from "../filtroBuscar/FiltroBuscar";

function ProvasResolvidas() {
  const [quantidade, setQuantidade] = useState(0);
  const [provas, setProvas] = useState([]);

  const buscarFiltrado = async (nome, busca) => {
    const res = await axios.get(
      `http://localhost:8080/api/prova/buscarResolucoesPorUsuario?pagina=${busca.pagina}&nome=${nome}&ordenacao=${busca.ordenacao}&ordem=${busca.ordem}`,
      { headers: AuthHeader() }
    );
    setProvas(res.data.provasResolvidas);
    setQuantidade(res.data.quantidade);
  };

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={"Provas"}
        opcoesFiltro={["Data"]}
        buscarFiltrado={buscarFiltrado}
        objetos={provas}
        quantidade={quantidade}
        tipo={3}
      />
    </>
  );
}

export default ProvasResolvidas;
