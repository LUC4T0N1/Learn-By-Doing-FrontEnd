import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import AuthHeader from "../../AuthContext";
import { getPerfil } from "../../application/perfilSlice";
import "./perfil.css";

function Perfil() {
  const { t } = useTranslation();
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
        process.env.REACT_APP_SERVER_URL + `usuario/trocarSenha`,
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

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPerfil());
  }, []);

  return (
    <div className="perfil">
      <div className="perfil-centro">
        <div className="perfil-campo-1">
          <p className="perfil-campo-nome">{t("nome")}</p>
          <p className="perfil-campo-valor">{perfil.nome}</p>
        </div>
        <div className="perfil-campo-1">
          <p className="perfil-campo-nome">Email: </p>
          <p className="perfil-campo-valor">{perfil.email}</p>
        </div>
        <div className="perfil-campo-1">
          <p className="perfil-campo-nome">{t("criacao-perfil-data")}</p>
          <p className="perfil-campo-valor">
            {perfil.dataCriacao.substring(0, 10)}
          </p>
        </div>
        <div className="perfil-meio">
          <div className="perfil-direita">
            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("provas-criadas")}:</p>
              <p className="perfil-campo-valor">{perfil.provasCriadas}</p>
            </div>
            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("provas-resolvidas")}:</p>
              <p className="perfil-campo-valor">{perfil.provasResolvidas}</p>
            </div>

            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("resolucoes-provas")}</p>
              <p className="perfil-campo-valor">{perfil.provasCorrigidas}</p>
            </div>
          </div>
          <div className="perfil-esquerda">
            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("questoes-criadas")}</p>
              <p className="perfil-campo-valor">{perfil.questoesCriadas}</p>
            </div>
            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("questoes-resolvidas")}</p>
              <p className="perfil-campo-valor">{perfil.questoesResolvidas}</p>
            </div>
            <div className="perfil-campo">
              <p className="perfil-campo-nome">{t("conteudos-criados")}</p>
              <p className="perfil-campo-valor">{perfil.conteudosCriados}</p>
            </div>
          </div>
        </div>
        <div className="trocar-senha">
          {!open ? (
            <button className="botao-simples" onClick={() => setOpen(true)}>
              {t("trocar-senha")}
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
                  placeholder={t("senha-atual")}
                  {...register("senhaAtual", {
                    required: t("senha-atual-obrigatoria"),
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
                {errors.senhaAtual ? (
                  <p className="error-message"> {errors.senhaAtual.message} </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder={t("senha-nova")}
                  {...register("senhaNova", {
                    required: t("senha-nova-obrigatoria"),
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
                {errors.senhaNova ? (
                  <p className="error-message"> {errors.senhaNova.message} </p>
                ) : (
                  ""
                )}
                <input
                  type="password"
                  className="input-texto-simples"
                  placeholder={t("confirmar-senha-nova")}
                  {...register("senhaNovaConfirmacao", {
                    validate: (value) =>
                      value === formRef.current.senhaNova.value ||
                      t("senhas-diferentes"),
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
                <button className="botao-simples">{t("trocar-senha")}</button>
                {sucesso ? (
                  <p className="success-message">{t("senha-trocada")}</p>
                ) : (
                  <></>
                )}
                {erro ? (
                  <p className="error-message">{t("senha-antiga-incorreta")}</p>
                ) : (
                  <></>
                )}
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
