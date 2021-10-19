import { createSlice } from "@reduxjs/toolkit";

const alternativaSlice =  createSlice({
  name: "alternativas",
  initialState: {alternativa :  {enunciado: "", correta: false}},
  reducers:{
    setAlternativa(state, action){
      const alternativaData = action.payload;
      return ({ ...state, alternativa: alternativaData })
    }
  }
});

export const { setAlternativa } = alternativaSlice.actions;
export default alternativaSlice.reducer;