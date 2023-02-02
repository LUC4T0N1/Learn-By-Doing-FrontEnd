import { createSlice } from "@reduxjs/toolkit";

const provaSlice = createSlice({
  name: "provas",
  initialState: {
    quantidade: 0,
    provas: [],
    prova: {
      nome: "",
      publica: true,
      conteudos: [],
      nomeConteudos: [],
      questoes: [],
      idsQuestoes: [],
      quantidadeQuestoes: 0,
      tempo: 0,
      dataInicial: new Date(),
      dataFinal: new Date(),
    },
    realizarProva: {
      nome: "",
      publica: true,
      conteudos: [],
      nomeConteudos: [],
      questoes: [],
      idsQuestoes: [],
      quantidadeQuestoes: 0,
      tempo: 0,
      questoesRespondidasDto: [],
    },
    provasCriadas: [],
    provasFeitas: [],
    corrigirProva: { provaDto: { quantidadeQuestoes: 0, questoes: [] } },
    provaCorrigida: { idProvaRealizada: 0, questoes: [] },
  },
  reducers: {
    setRespostaQuestao() {},
    getProvasPorConteudo() {},
    getProvasCriadas() {},
    getProvasFeitas() {},
    getProvasRealizadas() {},
    getProvaFeita() {},
    getProva() {},
    getProvaFazer() {},
    getProvaPrivada() {},
    realizarProva() {},
    cadastrarNovaProva() {},
    corrigirProva() {},
    setProva(state, action) {
      const provaData = action.payload;
      return { ...state, prova: provaData };
    },
    setRealizarProva(state, action) {
      const provaData = action.payload;
      return { ...state, realizarProva: provaData };
    },
    setCorrecaoProva(state, action) {
      const provaData = action.payload;
      return { ...state, provaCorrigida: provaData };
    },
    setCorrigirProva(state, action) {
      const provaData = action.payload;
      return { ...state, corrigirProva: provaData };
    },
    setProvasCriadas(state, action) {
      const provaData = action.payload;
      return { ...state, provasCriadas: provaData };
    },
    setProvas(state, action) {
      const provasData = action.payload;
      return { ...state, ...provasData };
    },
  },
});

export const {
  getProvasPorConteudo,
  getProva,
  setProvas,
  setProva,
  cadastrarNovaProva,
  setRealizarProva,
  setRespostaQuestao,
  realizarProva,
  getProvasCriadas,
  setProvasCriadas,
  getProvasFeitas,
  getProvaFeita,
  setCorrecaoProva,
  corrigirProva,
  getProvasRealizadas,
  getProvaPrivada,
  getProvaFazer,
  setCorrigirProva,
} = provaSlice.actions;
export default provaSlice.reducer;
