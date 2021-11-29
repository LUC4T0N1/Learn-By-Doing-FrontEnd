import { createSlice } from "@reduxjs/toolkit";

const perfilSlice =  createSlice({
  name: "perfil",
  initialState: {email: "", nome: ""},
  reducers:{
    setPerfil() {}
  }
});

export const { setPerfil } = perfilSlice.actions;
export default perfilSlice.reducer;