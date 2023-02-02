import React from "react";

function TrocarPagina({
  tamanhoPagina,
  quantidade,
  paginaAtual,
  proximaPagina,
  paginaAnterior,
}) {
  const calcularTotalPaginas = () => {
    const divisaoSimples = Math.floor(quantidade / tamanhoPagina);
    const resto = quantidade % tamanhoPagina;
    let totalPaginas = 1;
    if (quantidade != 0) {
      if (resto == 0) {
        totalPaginas = divisaoSimples;
      } else {
        totalPaginas = divisaoSimples + 1;
      }
    }
    return totalPaginas;
  };
  return (
    <div className="trocar-pagina">
      {paginaAtual == 1 ? (
        <button className="botao-simples-sem-hover">Pagina anterior</button>
      ) : (
        <button className="botao-simples" onClick={paginaAnterior}>
          Pagina anterior
        </button>
      )}

      <p>
        {paginaAtual}/{calcularTotalPaginas()}
      </p>
      {paginaAtual == calcularTotalPaginas() ? (
        <button className="botao-simples-sem-hover">Proxima Pagina</button>
      ) : (
        <button className="botao-simples" onClick={proximaPagina}>
          Proxima Pagina
        </button>
      )}
    </div>
  );
}

export default TrocarPagina;
