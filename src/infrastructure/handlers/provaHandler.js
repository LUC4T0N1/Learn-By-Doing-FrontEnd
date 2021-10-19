import { call, put } from "@redux-saga/core/effects";
import { setProva, setProvas } from "../../application/provaSlice";
import { cadastrarNovaProva, obterProva, obterProvas } from "../requests/provaRequest";

export function* handleObterProvas(action){
  try{
    const { payload } = action
    const response = yield call(obterProvas, payload.pagina, payload.body)
    const {data} = response
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleObterProva(action){
  try{
    const { payload } = action
    const response = yield call(obterProva, payload.idProva)
    const {data} = response
    const retorno = {prova: data}
    console.log(data)
    yield put(setProva({...retorno}))
  }catch (error){
    console.log(error)
  }
} 

export function* handleCadastrarNovaProva(action){
  try{
    console.log("chegou ai??")
    const { payload } = action
    const response = yield call(cadastrarNovaProva, payload.prova)
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
