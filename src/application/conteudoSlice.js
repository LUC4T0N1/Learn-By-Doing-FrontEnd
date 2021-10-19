import { createSlice } from "@reduxjs/toolkit";

const conteudoSlice =  createSlice({
  name: "conteudo",
  initialState: {conteudos: [], conteudo: {nome: ""}},
  reducers:{
    getConteudos() {},
    criarConteudo(){},
    setConteudos(state, action){
      const conteudosData = action.payload;
     return { ...state, ...conteudosData}
    },
    setConteudo(state, action){
      const conteudoData = action.payload;
      return ({ ...state, conteudo: conteudoData })
    }
  }
});

export const { getConteudos, setConteudos, criarConteudo, setConteudo } = conteudoSlice.actions;
export default conteudoSlice.reducer;