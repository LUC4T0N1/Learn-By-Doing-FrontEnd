import axios from "axios";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import AuthHeader from "../../AuthContext";
import "./perfil.css";

function Perfil() {
  const [erro, setErro] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const formRef = useRef();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const perfil = useSelector((state) => state.perfil);
  const [open, setOpen] = useState(false);

  const trocarSenha = async (e) => {
    try {
      let senhaForm = {
        senhaAtual: formRef.current.senhaAtual.value,
        senhaNova: formRef.current.senhaNova.value,
        senhaNovaConfirmacao: formRef.current.senhaNovaConfirmacao.value,
      };
      await axios.put(
        `http://localhost:8080/api/usuario/trocarSenha`,
        senhaForm,
        { headers: AuthHeader() }
      );
      setSucesso(true);
      setErro(false);
    } catch (error) {
      setSucesso(false);
      setErro(true);
    }
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
              <form
                className="mudar-senha-form"
                ref={formRef}
                onSubmit={handleSubmit(trocarSenha)}
              >
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder="Senha Atual..."
                  {...register("senhaAtual", {
                    required: "A senha atual é obrigatoria!",
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
                {errors.senhaAtual ? (
                  <p className="error-message"> {errors.senhaAtual.message} </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder="Senha Nova..."
                  {...register("senhaNova", {
                    required: "A senha atual é obrigatoria!",
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
                {errors.senhaNova ? (
                  <p className="error-message"> {errors.senhaNova.message} </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder="Confirmar Senha Nova ..."
                  {...register("senhaNovaConfirmacao", {
                    validate: (value) =>
                      value === formRef.current.senhaNova.value ||
                      "As senhas não são iguais!",
                  })}
                />
                {errors.senhaNovaConfirmacao ? (
                  <p className="error-message">
                    {" "}
                    {errors.senhaNovaConfirmacao.message}{" "}
                  </p>
                ) : (
                  ""
                )}
                <button className="botao-simples">Trocar senha</button>
                {sucesso ? (
                  <p className="success-message">Senha trocada com sucesso!</p>
                ) : (
                  <></>
                )}
                {erro ? (
                  <p className="error-message">Senha Antiga incorreta!</p>
                ) : (
                  <></>
                )}
              </form>
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
