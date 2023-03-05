import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import BuscarConteudosQuestoes from "../prova/criar-prova/buscar-conteudos/BuscarConteudosQuestoes";
import AscDesc from "./AscDesc";
import Filtro from "./Filtro";
import ResultadoQuestao from "./ResultadoQuestao";
import TrocarPagina from "./TrocarPagina";

export default function FiltroQuestoes({
  handleClose,
  opcoesFiltro,
  buscarFiltrado,
  quantidade,
  objetos,
  tipo,
  conteudosSelecionados,
}) {
  const { t } = useTranslation();
  const [busca, setBusca] = useState({
    nome: "",
    pagina: 0,
    ordenacao: 0,
    ordem: 0,
    tipo: 0,
    publica: true,
    conteudos: [],
    multiplaEscolha: true,
    dissertativa: true,
  });

  const adicionarConteudosFiltro = (id) => {
    var selecionado = busca.conteudos.filter((cont) => cont == id);
    if (selecionado.length == 0) {
      setBusca({ ...busca, conteudos: busca.conteudos.concat(id) });
    } else {
      setBusca({
        ...busca,
        conteudos: busca.conteudos.filter((cont) => cont != id),
      });
    }
  };

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

  const mudarPublica = (e) => {
    const value = e.target.value;
    setBusca({ ...busca, publica: value });
  };

  const mudarTipo = (e) => {
    const nome = e.target.name;
    if (nome == "opcao-filtro-ME") {
      if (busca.multiplaEscolha == true) {
        setBusca({ ...busca, tipo: 2, multiplaEscolha: false });
      } else {
        setBusca({ ...busca, tipo: 0, multiplaEscolha: true });
      }
    } else {
      if (busca.dissertativa == true) {
        setBusca({ ...busca, tipo: 1, dissertativa: false });
      } else {
        setBusca({ ...busca, tipo: 0, dissertativa: true });
      }
    }
  };

  return (
    <div className="escolher-questao">
      <button className="botao-fechar-2" onClick={handleClose}>
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
          <p className="busca-titulo">{t("buscar-questao")}</p>
          <div className="busca-filtro-questao">
            <input
              type="text"
              name="nome"
              className="input-texto-simples"
              placeholder={"Buscar Questão"}
              onChange={handleChange}
            ></input>
            <div className="filtros-container">
              <div className="opcoes-filtro-questao">
                <div className="opcao">
                  <input
                    className="filtro-opcao"
                    type="radio"
                    name="opcao-filtro-q"
                    value={true}
                    defaultChecked
                    onChange={mudarPublica}
                  />
                  <label>{t("questoes-publicas")}</label>
                </div>
                <div className="opcao">
                  <input
                    className="filtro-opcao"
                    type="radio"
                    name="opcao-filtro-q"
                    value={false}
                    onChange={mudarPublica}
                  />
                  <label>{t("suas-questoes")}</label>
                </div>
              </div>
              <div className="opcoes-filtro-questao">
                <div className="opcao">
                  {busca.dissertativa == true ? (
                    <>
                      <input
                        defaultChecked
                        className="filtro-opcao"
                        type="checkbox"
                        name="opcao-filtro-ME"
                        onChange={mudarTipo}
                      />
                      <label>{t("multipla-escolha")}</label>
                    </>
                  ) : (
                    <>
                      <input
                        disabled="disabled"
                        checked="checked"
                        className="filtro-opcao"
                        type="checkbox"
                        name="opcao-filtro-ME"
                      />
                      <label>{t("multipla-escolha")}</label>
                    </>
                  )}
                </div>
                {busca.multiplaEscolha == true ? (
                  <>
                    <div className="opcao">
                      <input
                        defaultChecked
                        className="filtro-opcao"
                        type="checkbox"
                        name="opcao-filtro-D"
                        onChange={mudarTipo}
                      />
                      <label>{t("dissertativa")}</label>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="opcao">
                      <input
                        disabled="disabled"
                        checked="checked"
                        className="filtro-opcao"
                        type="checkbox"
                        name="opcao-filtro-D"
                      />
                      <label>{t("dissertativa")}</label>
                    </div>
                  </>
                )}
              </div>
              <div className="opcoes-filtro-questao">
                {opcoesFiltro.map((opcao, index) => (
                  <Filtro
                    key={index}
                    index={index}
                    nomeFiltro={opcao}
                    mudarOrdenacao={mudarOrdenacao}
                  />
                ))}
              </div>
              <AscDesc
                e3={true}
                ordem={busca.ordem}
                ascendente={ascendente}
                descendente={descendente}
              />
            </div>
          </div>
          {objetos != undefined && objetos.length > 0 ? (
            <div className={"resultados-questoes"}>
              <BuscarConteudosQuestoes
                tamanhoPagina={5}
                adicionarConteudos={adicionarConteudosFiltro}
              />
              <div className="questoes-achadas">
                {objetos.map((objeto, index) => (
                  <ResultadoQuestao
                    key={index}
                    questao={{
                      numeroQuestao: index + 1,
                      enunciado: objeto.enunciado,
                      publica: objeto.publica,
                      multiplaEscolha: objeto.multiplaEscolha,
                      id: objeto.id,
                      valor: objeto.valor,
                      resposta: objeto.resposta,
                      alternativas: objeto.alternativas,
                    }}
                    handleClose={handleClose}
                  />
                ))}
                {busca.nome == "" ? (
                  <TrocarPagina
                    e2={true}
                    tamanhoPagina={10}
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
          ) : (
            <div className="nenhum-resultado">{t("nenhum-resultado")}</div>
          )}
        </div>
      </div>
    </div>
  );
}
