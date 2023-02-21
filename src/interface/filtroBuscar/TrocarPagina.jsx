import React from "react";
import { useTranslation } from "react-i18next";

function TrocarPagina({
  tamanhoPagina,
  quantidade,
  paginaAtual,
  proximaPagina,
  paginaAnterior,
}) {
  const { t } = useTranslation();
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
        <button className="botao-simples-sem-hover">
          {t("pagina-anterior")}
        </button>
      ) : (
        <button className="botao-simples" onClick={paginaAnterior}>
          {t("pagina-anterior")}
        </button>
      )}

      <p>
        {paginaAtual}/{calcularTotalPaginas()}
      </p>
      {paginaAtual == calcularTotalPaginas() ? (
        <button className="botao-simples-sem-hover">
          {t("proxima-pagina")}
        </button>
      ) : (
        <button className="botao-simples" onClick={proximaPagina}>
          {t("proxima-pagina")}
        </button>
      )}
    </div>
  );
}

export default TrocarPagina;
