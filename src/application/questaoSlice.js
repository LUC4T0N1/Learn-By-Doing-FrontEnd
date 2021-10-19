import { createSlice } from "@reduxjs/toolkit";

const questaoSlice =  createSlice({
  name: "questoes",
  initialState: {questoes : [], questao : {enunciado: "", publica: true, multiplaEscolha: false, resposta: "", valor: 0, alternativas: [], conteudos: [], nomeConteudos: [] }},
  reducers:{
    cadastrarNovaQuestao() {},
    setQuestao(state, action){
      const questaoData = action.payload;
      return ({ ...state, questao: questaoData })
    }
  }
});

export const { setQuestao, cadastrarNovaQuestao } = questaoSlice.actions;
export default questaoSlice.reducer;