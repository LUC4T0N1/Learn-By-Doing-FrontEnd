import React from "react";

function Filtro({ index, nomeFiltro, mudarOrdenacao }) {
  return (
    <div className="opcao">
      {index == 0 ? (
        <input
          className="filtro-opcao"
          type="radio"
          id={nomeFiltro}
          name="opcao-filtro"
          value={index}
          defaultChecked
          onChange={mudarOrdenacao}
        />
      ) : (
        <input
          className="filtro-opcao"
          type="radio"
          id={nomeFiltro}
          name="opcao-filtro"
          value={index}
          onChange={mudarOrdenacao}
        />
      )}
      <label for={nomeFiltro}>{nomeFiltro}</label>
    </div>
  );
}

export default Filtro;
