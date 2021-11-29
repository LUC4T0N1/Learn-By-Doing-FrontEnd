import { createSlice } from "@reduxjs/toolkit";

const autenticacaoSlice =  createSlice({
  name: "autenticacao",
  initialState: {uid: "", token: ""},
  reducers:{
    setUid(state, action){
      const authData = action.payload;
     return { ...state, uid: authData.uid}
    },
    setToken(state, action){
      const authData = action.payload;
     return { ...state, token: authData.token}
    }
  }
});

export const { setUid, setToken } = autenticacaoSlice.actions;
export default autenticacaoSlice.reducer;