import { createSlice } from "@reduxjs/toolkit";

const questaoSlice = createSlice({
  name: "questoes",
  initialState: {
    questoes: [],
    questao: {
      enunciado: "",
      publica: true,
      multiplaEscolha: false,
      resposta: "",
      valor: 0,
      alternativas: [],
      conteudos: [],
      nomeConteudos: [],
    },
    filtroQuestoes: [],
  },
  reducers: {
    getQuestoes() {},
    cadastrarNovaQuestao() {},
    setQuestao(state, action) {
      const questaoData = action.payload;
      return { ...state, questao: questaoData };
    },
    setQuestoes(state, action) {
      const questoesData = action.payload;
      return { ...state, ...questoesData };
    },
  },
});

export const { setQuestao, cadastrarNovaQuestao, getQuestoes, setQuestoes } =
  questaoSlice.actions;
export default questaoSlice.reducer;
