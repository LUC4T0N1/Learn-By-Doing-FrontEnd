import { createSlice } from "@reduxjs/toolkit";

const perfilSlice = createSlice({
  name: "perfil",
  initialState: {
    email: "",
    nome: "",
    completo: false,
    carregou: false,
    provasCriadas: 0,
    questoesCriadas: 0,
    provasResolvidas: 0,
    questoesResolvidas: 0,
    provasCorrigidas: 0,
    conteudosCriados: 0,
    dataCriacao: new Date(),
  },
  reducers: {
    setPerfil(state, action) {
      const perfilData = action.payload;
      console.log("perfilData: " + JSON.stringify(perfilData));
      return { ...state, ...perfilData };
    },
    completarPerfil() {},
    getPerfil() {},
    criarConta() {},
  },
});

export const { setPerfil, completarPerfil, getPerfil, criarConta } =
  perfilSlice.actions;
export default perfilSlice.reducer;
