import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
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
        `http://localhost:8080/api/prova/obterIdProvaPrivada?idSecreto=${formRef.current.idSecreto.value}`,
        { headers: AuthHeader() }
      );
      history.push({
        pathname: "/realizar-prova",
        state: { idProva: response.data },
      });
    } catch (error) {
      setErro(true);
    }
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit(buscar)}>
      <div className="login">
        <div className="login-container">
          <div className="login-mini-container">
            <div className="login-title" style={{ fontSize: "40px" }}>
              Buscar Prova Privada
            </div>
            <input
              type="text"
              className="input-texto-simples"
              placeholder="ID Secreto..."
              {...register("idSecreto", {
                required: "Digitie o ID secreto da prova!",
              })}
            />
            {errors.idSecreto ? (
              <p className="error-message"> {errors.idSecreto.message} </p>
            ) : (
              ""
            )}
            {erro ? <p className="error-message"> ID inválido! </p> : ""}
            <button className="botao-simples">Enviar</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default ProvaPrivada;
