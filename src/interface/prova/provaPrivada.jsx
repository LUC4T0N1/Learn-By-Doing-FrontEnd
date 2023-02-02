import axios from "axios";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AuthHeader from "../../AuthContext";

function ProvaPrivada() {
  const [id, setId] = useState("");

  let history = useHistory();

  const handleChange = (e) => {
    const value = e.target.value;
    setId(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:8080/api/prova/obterIdProvaPrivada?idSecreto=${id}`,
        { headers: AuthHeader() }
      );
      history.push({
        pathname: "/realizar-prova",
        state: { idProva: response.data },
      });
    } catch (error) {
      alert("Id inválido!");
    }
  };

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-mini-container">
          <div className="login-title" style={{ fontSize: "40px" }}>
            Buscar Prova Privada
          </div>
          <input
            type="text"
            name="nome-prova"
            className="input-texto-simples"
            placeholder="ID Secreto..."
            onChange={handleChange}
          ></input>
          <button className="botao-simples" onClick={handleSubmit}>
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
  {
  }
}

export default ProvaPrivada;
