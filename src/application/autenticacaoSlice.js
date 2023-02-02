import { createSlice } from "@reduxjs/toolkit";

const autenticacaoSlice = createSlice({
  name: "autenticacao",
  initialState: { uid: "", token: "" },
  reducers: {
    setUid(state, action) {
      const authData = action.payload;
      return { ...state, uid: authData.uid };
    },
    setToken(state, action) {
      const authData = action.payload;
      return { ...state, token: authData.token };
    },
    setAuth(state, action) {
      const authData = action.payload;
      localStorage.setItem("token", authData.token);
      return { ...state, token: authData.token, uid: authData.usuario };
    },
    setRegistrar() {},
    logar() {},
    logout(state, action) {
      localStorage.setItem("token", null);
      return { ...state, token: "", uid: "" };
    },
  },
});

export const { setUid, setToken, setRegistrar, logar, setAuth, logout } =
  autenticacaoSlice.actions;
export default autenticacaoSlice.reducer;
