import { createSlice } from "@reduxjs/toolkit";

const perfilSlice =  createSlice({
  name: "perfil",
  initialState: {email: "", nome: "", foto: "", completo: false, carregou: false},
  reducers:{
    setPerfil(state, action) {
      const perfilData = action.payload;
      console.log("perfilData: "+JSON.stringify(perfilData))
      return ({ ...state, ...perfilData})
    },
    completarPerfil() {},
    getPerfil() {}
  }
});

export const { setPerfil, completarPerfil, getPerfil } = perfilSlice.actions;
export default perfilSlice.reducer;