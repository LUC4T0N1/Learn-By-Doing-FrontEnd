import { createSlice } from "@reduxjs/toolkit";

const provaSlice = createSlice({
  name: "provas",
  initialState: {
    prova: {
      nome: "",
      publica: true,
      conteudos: [],
      nomeConteudos: [],
      questoes: [],
      idsQuestoes: [],
      quantidadeQuestoes: 0,
      tempo: 0,
      dataInicial: null,
      dataFinal: null,
      tentativas: 0,
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
    provaCriada: {
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
    corrigirProva: { provaDto: { quantidadeQuestoes: 0, questoes: [] } },
    provaResolvida: { provaDto: { quantidadeQuestoes: 0, questoes: [] } },
    provaCorrigida: { idProvaRealizada: 0, questoes: [] },
  },
  reducers: {
    setRespostaQuestao() {},
    getProvasPorConteudo() {},
    getProvasCriadas() {},
    getProvasFeitas() {},
    getProvasRealizadas() {},
    getProvaFeita() {},
    getProvaCorrigir() {},
    getProva() {},
    getProvaCriada() {},
    getProvaFazer() {},
    getProvaPrivada() {},
    cadastrarNovaProva() {},
    corrigirProva() {},
    setProva(state, action) {
      console.log("aaaa");
      const provaData = action.payload;
      return { ...state, prova: provaData };
    },
    setRealizarProva(state, action) {
      const provaData = action.payload;
      return { ...state, realizarProva: provaData };
    },
    setProvaCriada(state, action) {
      const provaData = action.payload;
      return { ...state, provaCriada: provaData };
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
  getProvaCriada,
  setProvas,
  setProva,
  cadastrarNovaProva,
  setRealizarProva,
  setProvaCriada,
  setRespostaQuestao,
  getProvasCriadas,
  setProvasCriadas,
  getProvasFeitas,
  getProvaFeita,
  getProvaCorrigir,
  setCorrecaoProva,
  corrigirProva,
  getProvasRealizadas,
  getProvaPrivada,
  getProvaFazer,
  setCorrigirProva,
} = provaSlice.actions;
export default provaSlice.reducer;
