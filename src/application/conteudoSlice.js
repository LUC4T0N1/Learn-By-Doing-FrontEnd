import { createSlice } from "@reduxjs/toolkit";

const conteudoSlice =  createSlice({
  name: "conteudo",
  initialState: {conteudos: [], conteudo: {nome: ""}, quantidade: 0},
  reducers:{
    getConteudos() {},
    filtrarConteudos() {},
    criarConteudo(){},
    setConteudos(state, action){
     const conteudosData = action.payload;
/*      console.log("oieee  " + JSON.stringify(conteudosData.conteudos))
     console.log("oieee2  " + JSON.stringify(state.conteudos))
     Object.assign(state.conteudos, conteudosData.conteudos); */
      return { ...state, conteudos: conteudosData.conteudos} 
    },
    setConteudo(state, action){
      const conteudoData = action.payload;
      console.log("oieee  " + JSON.stringify(conteudoData))
      return ({ ...state, conteudo: conteudoData })
    }
  }
});

export const { getConteudos, setConteudos, criarConteudo, setConteudo, filtrarConteudos } = conteudoSlice.actions;
export default conteudoSlice.reducer;