import { call, put } from "@redux-saga/core/effects";
import { setConteudos } from "../../application/conteudoSlice";
import { criarConteudo, filtrarConteudos, obterConteudos } from "../requests/conteudoRequest";

export function* handleObterConteudos(action){
  try{
    const { payload } = action
    const response = yield call(obterConteudos, payload.pagina)
    const {data} = response
    yield put(setConteudos({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleCriarConteudo(action){
  try{
    const { payload } = action
    console.log("aa"+payload.conteudo )
    const response = yield call(criarConteudo, payload.conteudo)
    const status = response.status;
    if(status == '200'){
      alert('sucesso')
    }else{
      alert('erro')
    }
    window.location.reload();
  }catch (error){
    console.log(error)
  }
}   

export function* handleFiltrarConteudos(action){
  try{
    const { payload } = action
    const response = yield call(filtrarConteudos, payload.nome, payload.pagina, payload.ordenacao)
    const {data} = response
    console.log("resp: "+ JSON.stringify(data))
    yield put(setConteudos({...data}))
  }catch (error){
    console.log(error)
  }
}   




