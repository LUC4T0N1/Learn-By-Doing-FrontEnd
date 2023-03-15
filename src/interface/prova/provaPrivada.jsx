import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import AuthHeader from "../../AuthContext";

function ProvaPrivada() {
  const [erro, setErro] = useState(false);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();

  const buscar = async (e) => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_SERVER_URL +
          `prova/obterIdProvaPrivada?idSecreto=${formRef.current.idSecreto.value}`,
        { headers: AuthHeader() }
      );
      history.push({
        pathname: "/solveTest",
        state: { idProva: response.data },
      });
    } catch (error) {
      setErro(true);
    }
  };
  const { t } = useTranslation();

  return (
    <form ref={formRef} onSubmit={handleSubmit(buscar)}>
      <div className="login">
        <div className="login-container">
          <div className="login-mini-container">
            <div className="login-title" style={{ fontSize: "40px" }}>
              {t("buscar-prova-privada")}
            </div>
            <input
              type="text"
              className="input-texto-simples"
              placeholder={t("id-secreto")}
              {...register("idSecreto", {
                required: t("id-secreto-erro-1"),
              })}
            />
            {errors.idSecreto ? (
              <p className="error-message"> {errors.idSecreto.message} </p>
            ) : (
              ""
            )}
            {erro ? (
              <p className="error-message"> {t("id-secreto-erro-2")}</p>
            ) : (
              ""
            )}
            <button className="botao-simples">{t("buscar")}</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProvaPrivada;
