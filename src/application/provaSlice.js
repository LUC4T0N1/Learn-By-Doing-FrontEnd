import { createSlice } from "@reduxjs/toolkit";

const provaSlice =  createSlice({
  name: "provas",
  initialState: {provas: [], prova: {nome: "", publica: true, conteudos: [], nomeConteudos: [], questoes:[]}},
  reducers:{
    getProvas() {},
    getProva() {},
    cadastrarNovaProva() {},
    setProva(state, action){
      const provaData = action.payload;
      console.log("nomes conteudos: "+ provaData.nomeConteudos)
      console.log("ids conteudos: "+ provaData.conteudos)
      return ({ ...state, prova: provaData })
    },
    setProvas(state, action){
      const provasData = action.payload;
     return { ...state, ...provasData}
    }
  }
});

export const { getProvas, getProva, setProvas, setProva, cadastrarNovaProva } = provaSlice.actions;
export default provaSlice.reducer;