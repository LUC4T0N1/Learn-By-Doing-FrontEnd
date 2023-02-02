import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../../application/autenticacaoSlice";
import AuthHeader from "../../../AuthContext";
import FiltroBuscar from "../../filtroBuscar/FiltroBuscar";

export default function ListaConteudos() {
  const [quantidade, setQuantidade] = useState(0);
  const [conteudos, setConteudos] = useState([]);
  const dispatch = useDispatch();
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

  return (
    <>
      <FiltroBuscar
        tamanhoPagina={5}
        titulo={"Conteúdos"}
        opcoesFiltro={["Ordem Alfabética", "Número de Provas"]}
        buscarFiltrado={buscarFiltrado}
        objetos={conteudos}
        quantidade={quantidade}
        tipo={1}
      />
    </>
  );
}
