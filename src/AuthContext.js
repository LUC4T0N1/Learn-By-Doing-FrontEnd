import React, { createContext } from "react";
import { useDispatch, useSelector } from "react-redux";
const Context = createContext();

export default function AuthHeader() {
  const token = localStorage.getItem("token");
  if (token != null) {
    return { Authorization: "Bearer " + token };
  } else {
    return {};
  }
}

function AuthProvider({ children }) {
  const dispatch = useDispatch();
  const autenticacao = useSelector((state) => state.autenticacao);

  return (
    <Context.Provider value={{ authenticated: false }}>
      {children}
    </Context.Provider>
  );
}

export { Context, AuthProvider };
