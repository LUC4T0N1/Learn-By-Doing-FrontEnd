import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../application/autenticacaoSlice";
import PopUp from "../popup/PopUp";

function Registrar() {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  let history = useHistory();

  const registrar = async () => {
    try {
      let login = {
        senha: formRef.current.senha.value,
        email: formRef.current.email.value,
        nome: formRef.current.nome.value,
      };
      await axios.post(`http://localhost:8080/api/usuario`, login);
      setSucesso(true);
    } catch (error) {
      setErro(true);
    }
  };

  function toLogin() {
    dispatch(logout({ ...{} }));
    history.push(`/login`);
  }

  return (
    <>
      {sucesso ? (
        <>
          <PopUp
            mensagem={"Conta criada com sucesso!"}
            funcao={toLogin}
            mensagemFuncao={"Ir para o login"}
          />
        </>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit(registrar)}>
          <div className="login">
            <div className="login-container">
              <div className="login-mini-container">
                <div className="login-title">Criar Conta</div>
                <input
                  className="input-texto-simples"
                  placeholder="E-mail..."
                  {...register("email", {
                    required: "O e-mail é obrigatorio!",
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: "E-mail com formato inválido!",
                    },
                  })}
                />
                {errors.email ? (
                  <p className="error-message"> {errors.email.message} </p>
                ) : (
                  ""
                )}
                <input
                  className="input-texto-simples"
                  placeholder="Nome..."
                  {...register("nome", {
                    required: "O nome é obrigatorio!",
                    minLength: {
                      value: 6,
                      message: "O nome deve conter pelo menos 6 digitos!",
                    },
                  })}
                />
                {errors.nome ? (
                  <p className="error-message"> {errors.nome.message} </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder="Senha..."
                  {...register("senha", {
                    required: "A senha é obrigatoria!",
                    minLength: {
                      value: 8,
                      message: "A senha deve conter pelo menos 8 digitos!",
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
                      message:
                        "A senha deve conter pelo menos uma letra maiúscula, um caracter especial, um número e 8 caracteres!",
                    },
                  })}
                />
                {errors.senha ? (
                  <p className="error-message"> {errors.senha.message} </p>
                ) : (
                  ""
                )}
                <button className="botao-simples">Registrar</button>
                {erro ? (
                  <p className="error-message">E-mail já cadastrado!</p>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
}

export default Registrar;
