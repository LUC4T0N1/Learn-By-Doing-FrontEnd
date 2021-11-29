import { createSlice } from "@reduxjs/toolkit";

const provaSlice =  createSlice({
  name: "provas",
  initialState: {
    provas: [],
    prova: {nome: "", publica: true, conteudos: [],
         nomeConteudos: [], questoes:[], idsQuestoes:[], 
         quantidadeQuestoes: 0, tempo: 0}, 
    realizarProva: {nome: "", publica: true, conteudos: [],
         nomeConteudos: [], questoes:[], idsQuestoes:[],
         quantidadeQuestoes: 0, tempo: 0, questoesRespondidasDto:[]},
    provasCriadas: [],
    provasFeitas: [],
    corrigirProva: {provaDto: {quantidadeQuestoes: 0, questoes: []}},
    provaCorrigida: {idProvaRealizada: 0, questoes: []}
      },
  reducers:{
    setRespostaQuestao() {

    },
    getProvas() {},
    getProvasCriadas() {},
    getProvasFeitas() {},
    getProvasRealizadas() {},
    getProvaFeita() {},
    getProva() {},
    realizarProva() {},
    cadastrarNovaProva() {},
    corrigirProva() {},
    setProva(state, action){
      const provaData = action.payload;
      console.log(" prova: "+JSON.stringify(provaData))
      return ({ ...state, prova: provaData })
    },
    setRealizarProva(state, action){
      const provaData = action.payload;
      console.log("realizar prova: "+JSON.stringify(provaData))
      return ({ ...state, realizarProva: provaData })
    },
    setCorrecaoProva(state, action){
      const provaData = action.payload;
      console.log("realizar prova: "+JSON.stringify(provaData))
      return ({ ...state, provaCorrigida: provaData })
    },
    setProvasCriadas(state, action){
      const provaData = action.payload;
      console.log("provas criadas: "+provaData)
      return ({ ...state, provasCriadas: provaData })
    },
    setProvas(state, action){
      const provasData = action.payload;
     return { ...state, ...provasData}
    }
  }
});

export const { getProvas, getProva, setProvas,
   setProva, cadastrarNovaProva, setRealizarProva, 
   setRespostaQuestao, realizarProva, 
   getProvasCriadas, setProvasCriadas, getProvasFeitas,
   getProvaFeita, setCorrecaoProva, corrigirProva,
   getProvasRealizadas } = provaSlice.actions;
export default provaSlice.reducer;