import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPerfil } from "../../application/perfilSlice";
import "./perfil.css";

function Perfil() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerfil());
  }, []);

  const perfil = useSelector((state) => state.perfil);

  return (
    <div className="perfil">
      <div className="perfil-esquerda">
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Nome: </p>
          <p className="perfil-campo-valor">{perfil.nome}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Email: </p>
          <p className="perfil-campo-valor">{perfil.email}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Data de Criação do Perfil: </p>
          <p className="perfil-campo-valor">{perfil.dataCriacao}</p>
        </div>
      </div>
      <div className="perfil-direita">
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Provas Criadas: </p>
          <p className="perfil-campo-valor">{perfil.provasCriadas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Provas Resolvidas: </p>
          <p className="perfil-campo-valor">{perfil.provasResolvidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Resolucoes das suas provas: </p>
          <p className="perfil-campo-valor">{perfil.provasCorrigidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Questões Criadas: </p>
          <p className="perfil-campo-valor">{perfil.questoesCriadas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Questões Resolvidas: </p>
          <p className="perfil-campo-valor">{perfil.questoesResolvidas}</p>
        </div>
        <div className="perfil-campo">
          <p className="perfil-campo-nome">Conteudos Criados: </p>
          <p className="perfil-campo-valor">{perfil.conteudosCriados}</p>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
