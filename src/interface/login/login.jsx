import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { setAuth } from "../../application/autenticacaoSlice";
import PopUp from "../popup/PopUp";
import "./login.css";

function Login() {
  const { t } = useTranslation();
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
    history.push(`/perfil`);
  };

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
            mensagem={t("login-sucesso")}
            funcao={toPerfil}
            mensagemFuncao={t("ir-site")}
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
                    required: t("email-obrigatorio"),
                    pattern: {
                      value:
                        /^(([^<>()[\]\\.,;:\s@]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                      message: t("email-invalido"),
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
                  placeholder={t("senha...")}
                  {...register("senha", {
                    required: t("senha-obrigatoria"),
                    minLength: {
                      value: 8,
                      message: t("senha-pequena"),
                    },
                    pattern: {
                      value:
                        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/g,
                      message: t("senha-invalida"),
                    },
                  })}
                />
                {errors.senha ? (
                  <p className="error-message"> {errors.senha.message} </p>
                ) : (
                  ""
                )}
                <button className="botao-simples">{t("enviar")}</button>
                {erro ? (
                  <p className="error-message">{t("login-invalido")}</p>
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
