import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../application/autenticacaoSlice";
import PopUp from "../popup/PopUp";

function Registrar() {
  const { t } = useTranslation();
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
            mensagem={t("conta-criada")}
            funcao={toLogin}
            mensagemFuncao={t("ir-login")}
          />
        </>
      ) : (
        <form ref={formRef} onSubmit={handleSubmit(registrar)}>
          <div className="login">
            <div className="login-container">
              <div className="login-mini-container">
                <div className="login-title">{t("criar-conta")}</div>
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
                  className="input-texto-simples"
                  placeholder={t("nome...")}
                  {...register("nome", {
                    required: t("nome-obrigatorio"),
                    minLength: {
                      value: 6,
                      message: t("nome-pequeno"),
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
                <button className="botao-simples">{t("registrar")}</button>
                {erro ? (
                  <p className="error-message">{t("email-repetido")}</p>
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
