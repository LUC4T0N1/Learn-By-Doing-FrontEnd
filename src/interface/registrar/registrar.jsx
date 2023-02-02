import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../application/autenticacaoSlice";
import { criarConta } from "../../application/perfilSlice";

function Registrar() {
  const [login, setLogin] = useState({ senha: "", email: "", nome: "" });

  const dispatch = useDispatch();
  let history = useHistory();

  const registrar = async () => {
    try {
      dispatch(criarConta({ ...login }));
      dispatch(logout({ ...{} }));
      toLogin();
    } catch (error) {
      alert("erro: " + error.message);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const nome = e.target.name;
    setLogin({ ...login, [nome]: value });
  };

  function toLogin() {
    history.push(`/login`);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (login.senha && login.email) {
      await registrar();
    } else {
      alert("preencha senha e email");
    }
  };

  return (
    <>
      <div className="login">
        <div className="login-container">
          <div className="login-mini-container">
            <div className="login-title">Criar Conta</div>
            <input
              type="email"
              name="email"
              className="input-texto-simples"
              placeholder="E-mail..."
              onChange={handleChange}
            ></input>
            <input
              type="text"
              name="nome"
              className="input-texto-simples"
              placeholder="Nome..."
              onChange={handleChange}
            ></input>
            <input
              type="password"
              name="senha"
              className="input-texto-simples"
              placeholder="Senha..."
              onChange={handleChange}
            ></input>
            <button className="botao-simples" onClick={handleSubmit}>
              Registrar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrar;
