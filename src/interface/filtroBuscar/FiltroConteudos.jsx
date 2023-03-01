import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import AscDesc from "./AscDesc";
import Filtro from "./Filtro";
import ResultadoCardConteudo from "./ResultadoCardConteudo";
import Tag from "./Tag";
import TrocarPagina from "./TrocarPagina";

export default function FiltroConteudos({
  tamanhoPagina,
  handleClose,
  titulo,
  opcoesFiltro,
  buscarFiltrado,
  quantidade,
  objetos,
  tipo,
  conteudosSelecionados,
  addConteudo,
  e2,
}) {
  const { t } = useTranslation();
  const [busca, setBusca] = useState({
    nome: "",
    pagina: 0,
    ordenacao: 0,
    ordem: 0,
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
    <div className={e2 ? "escolher-conteudo2" : "escolher-conteudo"}>
      <button className="botao-fechar" onClick={handleClose}>
        <i>
          <FontAwesomeIcon
            icon={faX}
            rel="noreferrer"
            className="icon-fechar"
          ></FontAwesomeIcon>
        </i>
      </button>
      <div className="filtro-buscar-container">
        <div className="filtro-buscar-form">
          <p className="busca-titulo">{titulo}</p>
          <div className="busca-filtro2">
            <input
              type="text"
              name="nome"
              className="input-texto-simples"
              placeholder={titulo}
              onChange={handleChange}
            ></input>
          </div>
          <div className="busca-filtro">
            <div className="filtros-container">
              <AscDesc
                e4={true}
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

          <div className={tipo == 1 ? "resultados" : "resultados-provas"}>
            <div className="questoes-achadas">
              <div className="conteudos-selecionados2">
                {conteudosSelecionados.map((c) => (
                  <Tag id={c.id} nome={c.nome} handleRemove={addConteudo} />
                ))}
              </div>
              {objetos.map((objeto, index) => (
                <ResultadoCardConteudo
                  addConteudo={addConteudo}
                  key={index}
                  nome={objeto.nome}
                  idObjeto={objeto.idConteudo}
                  dados={[t("provas") + ": " + objeto.numeroProvas]}
                />
              ))}
            </div>
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
        </div>
      </div>
    </div>
  );
}
