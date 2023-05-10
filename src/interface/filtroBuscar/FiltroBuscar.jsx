import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AscDesc from "./AscDesc";
import Filtro from "./Filtro";
import "./FiltroBuscar.css";
import ResultadoCard from "./ResultadoCard";
import TrocarPagina from "./TrocarPagina";

function FiltroBuscar({
  tamanhoPagina,
  titulo,
  opcoesFiltro,
  buscarFiltrado,
  quantidade,
  objetos,
  tipo,
}) {
  const { t } = useTranslation();
  const [busca, setBusca] = useState({
    nome: "",
    pagina: 0,
    ordenacao: 0,
    ordem: 1,
  });
  const handleChange = (e) => {
    const value = e.target.value;
    const nome = e.target.name;
    setBusca({ ...busca, [nome]: value, pagina: 0 });
  };

  const mudarOrdenacao = (e) => {
    const value = e.target.value;
    setBusca({ ...busca, ordenacao: value });
  };

  const ascendente = () => {
    setBusca({ ...busca, ordem: 0 });
  };

  const descendente = () => {
    setBusca({ ...busca, ordem: 1 });
  };

  const proximaPagina = () => {
    setBusca({ ...busca, pagina: busca.pagina + 1 });
  };

  const paginaAnterior = () => {
    setBusca({ ...busca, pagina: busca.pagina - 1 });
  };

  useEffect(() => {
    if (busca.nome != "") {
      buscarFiltrado(busca.nome, busca);
    } else {
      buscarFiltrado(null, busca);
    }
  }, [busca]);

  return (
    <div className="filtro-buscar-container">
      <div className="filtro-buscar-form">
        <p className="busca-titulo">
          {t("buscar")} {titulo}
        </p>
        <div className="busca-filtro2">
          <input
            type="text"
            name="nome"
            className="input-texto-simples"
            placeholder={t("buscar") + " " + titulo}
            onChange={handleChange}
          ></input>
        </div>
        <div className="busca-filtro">
          <div className="filtros-container">
            <AscDesc
              ordem={busca.ordem}
              ascendente={ascendente}
              descendente={descendente}
            />
            <div className="opcoes-filtro">
              {opcoesFiltro.map((opcao, index) => (
                <Filtro
                  key={index}
                  index={index}
                  nomeFiltro={opcao}
                  mudarOrdenacao={mudarOrdenacao}
                />
              ))}
            </div>
          </div>
        </div>
        {objetos != undefined && objetos.length > 0 ? (
          <div className={tipo == 1 ? "resultados" : "resultados-provas"}>
            {objetos.map((objeto, index) =>
              tipo == 1 ? (
                <ResultadoCard
                  key={index}
                  tipo={tipo}
                  nome={objeto.nome}
                  idObjeto={objeto.idConteudo}
                  dados={[
                    t("provas") + ": " + objeto.numeroProvas,
                    t("provas-publicas") + objeto.numeroProvasPublicas,
                  ]}
                />
              ) : tipo == 2 || tipo == 4 || tipo == 5 ? (
                <ResultadoCard
                  key={index}
                  tipo={tipo}
                  nome={objeto.nome}
                  idObjeto={objeto.id}
                  dados={[
                    t("questoes") + objeto.quantidadeQuestoes,
                    t("realizacoes") + objeto.popularidade,
                    t("nota-media") + objeto.mediaNotas + "%",
                    objeto.publica ? t("prova-publica") : t("prova-privada"),
                  ]}
                />
              ) : tipo == 3 ? (
                <ResultadoCard
                  key={index}
                  tipo={tipo}
                  nome={objeto.nomeProva}
                  idObjeto={objeto.id}
                  dados={[
                    objeto.corrigida
                      ? t("nota-final") + objeto.nota + "/" + objeto.notaMaxima
                      : t("nota-parcial") +
                        objeto.nota +
                        "/" +
                        objeto.notaMaxima,
                    t("data") + ": " + objeto.dataResolucao.substring(0, 10),
                    objeto.publica ? t("prova-publica") : t("prova-privada"),
                  ]}
                  publica={objeto.publica}
                />
              ) : (
                <ResultadoCard
                  key={index}
                  tipo={tipo}
                  nome={objeto.nomeAluno}
                  idObjeto={objeto.id}
                  dados={[
                    objeto.totalmenteCorrigida
                      ? t("nota-final") +
                        objeto.notaAluno +
                        "/" +
                        objeto.notaMaxima
                      : t("nota-parcial") +
                        objeto.notaAluno +
                        "/" +
                        objeto.notaMaxima,
                    t("data") + ": " + objeto.dataResolucao.substring(0, 10),
                    t("questoes-corrigidas") +
                      objeto.questoesCorrigidas +
                      "/" +
                      objeto.totalQuestoes,
                  ]}
                />
              )
            )}
            {busca.nome == "" ? (
              <TrocarPagina
                e2={true}
                tamanhoPagina={tamanhoPagina}
                quantidade={quantidade}
                paginaAtual={busca.pagina + 1}
                proximaPagina={proximaPagina}
                paginaAnterior={paginaAnterior}
              />
            ) : (
              <></>
            )}
          </div>
        ) : (
          <div className="nenhum-resultado">{t("nenhum-resultado")}</div>
        )}
      </div>
    </div>
  );
}

export default FiltroBuscar;
