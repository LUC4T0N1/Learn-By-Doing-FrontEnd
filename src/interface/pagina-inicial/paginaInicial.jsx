import React from "react";
import Intro from "./intro/intro";
import Items from "./items/items";
import "./PaginaInicial.css";
function PaginaInicial() {
  return (
    <div className="pagina-inicial">
      <Intro />
      <Items />
    </div>
  );
}

export default PaginaInicial;
