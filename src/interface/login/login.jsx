import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuth } from "../../application/autenticacaoSlice";
import { getPerfil } from "../../application/perfilSlice";
import PopUp from "../popup/PopUp";
import "./login.css";

function Login() {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let history = useHistory();
  const dispatch = useDispatch();

  const toPerfil = async () => {
    await dispatch(getPerfil());
    history.push(`/perfil`);
  };

  /*   function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }
 */

  const handleLogar = async (e) => {
    try {
      let login = {
        senha: formRef.current.senha.value,
        email: formRef.current.email.value,
      };
      let response = await axios.post(
        `http://localhost:8080/api/usuario/login`,
        login
      );
      dispatch(setAuth({ ...response.data }));
      setSucesso(true);
    } catch (error) {
      setErro(true);
    }
  };

  return (
    <>
      {sucesso ? (
        <>
          <PopUp
            mensagem={"Login realizado com sucesso!"}
            funcao={toPerfil}
            mensagemFuncao={"Ir para o site"}
          />
        </>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit(handleLogar)}>
          <div className="login">
            <div className="login-container">
              <div className="login-mini-container">
                <div className="login-title">Login</div>
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
                <button className="botao-simples">Enviar</button>
                {erro ? (
                  <p className="error-message">Login inválido!</p>
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

export default Login;
