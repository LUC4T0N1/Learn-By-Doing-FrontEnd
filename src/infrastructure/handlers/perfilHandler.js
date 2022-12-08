import { call, put } from "@redux-saga/core/effects";
import { setPerfil } from "../../application/perfilSlice";
import { buscarUsuario, cadastrarNovoUsuario } from "../requests/perfilRequest";

export function* handleCompletarPerfil(action){
  try{
    const { payload } = action
    console.log("uiui"+JSON.stringify(payload.body))
    const response = yield call(cadastrarNovoUsuario, payload.body)
    const status = response.status;
    if(status == '200'){
      alert('sucesso')
    }else{
      alert('erro')
    }
  }catch (error){
    console.log(error)
  }
}   

export function* handleBuscarPerfil(){
  try{
    console.log("buscando perfil..")
    const response = yield call(buscarUsuario)
    const {data} = response
    console.log("resposta busca perfil: " + JSON.stringify(response))
    yield put(setPerfil({...data}))
  }catch (error){
    console.log(error)
  }
} 

export function* handleCriarConta(action){
  try{
    const data = action.payload;
    console.log("corpo criar conta: "+ JSON.stringify(data))
    yield call(cadastrarNovoUsuario, data)
    alert('sucesso')
  }catch (error){
    if(error.message.includes("409")){
      alert('Email já cadastrado!')
    }else{
      alert("erro!");
    }
  }
} 


