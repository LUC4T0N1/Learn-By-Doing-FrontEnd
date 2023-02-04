import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPerfil } from "../../application/perfilSlice";
import AuthHeader from "../../AuthContext";
import "./perfil.css";

function Perfil() {
  const dispatch = useDispatch();
  const perfil = useSelector((state) => state.perfil);
  const [open, setOpen] = useState(false);
  const [botaoOk, setBotaoOk] = useState(false);
  const [novaSenhaOk, setNovaSenhaOk] = useState(false);
  const [senhaForm, setSenhaForm] = useState({
    senhaAtual: "",
    senhaNova: "",
    senhaNovaConfirmacao: "",
  });
  useEffect(() => {
    dispatch(getPerfil());
    if (
      senhaForm.senhaAtual != "" &&
      senhaForm.senhaNova != "" &&
      senhaForm.senhaNovaConfirmacao != "" &&
      senhaForm.senhaNova == senhaForm.senhaNovaConfirmacao
    ) {
      setBotaoOk(true);
    } else {
      setBotaoOk(false);
    }
    if (senhaForm.senhaNova == senhaForm.senhaNovaConfirmacao) {
      setNovaSenhaOk(true);
    } else {
      setNovaSenhaOk(false);
    }
  }, [senhaForm]);

  const trocarSenha = async (e) => {
    try {
      await axios.put(
        `http://localhost:8080/api/usuario/trocarSenha`,
        senhaForm,
        { headers: AuthHeader() }
      );
      alert("Sucesso!");
    } catch (error) {
      alert("Senha antiga está errada!");
    }
  };

  const handleChange = (e) => {
    let nome = e.target.name;
    let valor = e.target.value;
    setSenhaForm({ ...senhaForm, [nome]: valor });
  };

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
        <div className="trocar-senha">
          {!open ? (
            <button className="botao-simples" onClick={() => setOpen(true)}>
              Trocar senha
            </button>
          ) : (
            <>
              <input
                type="password"
                className="input-texto-simples"
                placeholder="Senha atual"
                name="senhaAtual"
                onChange={handleChange}
              ></input>
              <input
                type="password"
                name="senhaNova"
                className="input-texto-simples"
                placeholder="Senha Nova"
                onChange={handleChange}
              ></input>
              <input
                type="password"
                name="senhaNovaConfirmacao"
                className={
                  novaSenhaOk ? "input-texto-simples" : "input-texto-erro"
                }
                placeholder="Confirmar Senha nova"
                onChange={handleChange}
              ></input>
              {botaoOk ? (
                <button className="botao-simples" onClick={trocarSenha}>
                  Trocar senha
                </button>
              ) : (
                <button className="botao-simples-sem-hover">
                  Trocar senha
                </button>
              )}
            </>
          )}
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
