import React, { useEffect, createContext} from 'react'
import {
  onAuthStateChanged
} from "firebase/auth";
import { auth } from "./firebase"
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setToken, setUid } from './application/autenticacaoSlice';
import { getPerfil, setPerfil } from './application/perfilSlice';
const Context = createContext();

export default function AuthHeader() {

  const token = localStorage.getItem('token');
  if (token!=null) {
    return { Authorization: 'Bearer ' + token };
  } else {
    return {};
  }
}

function AuthProvider({children}){

  const dispatch = useDispatch();
  const autenticacao = useSelector((state) => state.autenticacao);


  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if(currentUser){
      console.log("oii")
      console.log(JSON.stringify(currentUser))
      dispatch(setUid({...autenticacao, uid: currentUser?.uid}))  
      dispatch(setToken({...autenticacao, token: currentUser?.stsTokenManager.accessToken}))  
      localStorage.setItem('token', currentUser?.stsTokenManager.accessToken);  
      console.log("token: "+ currentUser?.stsTokenManager.accessToken)
      dispatch(getPerfil())  
      }else{
        console.log("deslogado: " )
        dispatch(setUid({...autenticacao, uid: ""}))  
        dispatch(setToken({...autenticacao, token: ""}))  
        localStorage.setItem('token', null);  
        dispatch(setPerfil({email: "", nome: "", foto: "", completo: false, carregou: false}))
      }
  });
}, [dispatch])

  return(
    <Context.Provider value={{authenticated:false}}>
      {children}
    </Context.Provider>
  );
}

export {Context, AuthProvider}