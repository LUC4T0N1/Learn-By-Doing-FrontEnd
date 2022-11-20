import { call, put } from "@redux-saga/core/effects";
import { setProvas, setRealizarProva } from "../../application/provaSlice";
import { cadastrarNovaProva, corrigirProva, obterProva, obterProvaFeita, obterProvaPrivada, obterProvas, obterProvasCriadas, obterProvasFeitas, obterProvasPorConteudo, obterProvasRealizadas, realizarProva } from "../requests/provaRequest";

export function* handleObterProvasPorConteudo(action){
  try{
    const { payload } = action
    const response = yield call(obterProvasPorConteudo, payload.pagina, payload.nome, payload.ordenacao, payload.idConteudo)
    const {data} = response
    console.log(JSON.stringify(response))
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleObterProva(action){
  try{
    const { payload } = action
    const response = yield call(obterProva, payload.idProva)
    const prova = response.data
    const newObj = Object.assign({selected: false}, prova);
    newObj["questoesRespondidasDto"] = []
    yield put(setRealizarProva({...newObj}))
  }catch (error){
    console.log(error)
  }
} 


export function* handleObterProvaPrivada(action){
  try{
    const { payload } = action
    const response = yield call(obterProvaPrivada, payload.idProva)
    const prova = response.data
    const newObj = Object.assign({selected: false}, prova);
    newObj["questoesRespondidasDto"] = []
    yield put(setRealizarProva({...newObj}))
  }catch (error){
    console.log(error)
  }
} 

export function* handleCadastrarNovaProva(action){
  try{
    const provaData = action.payload;
    console.log(JSON.stringify(provaData))
    const response = yield call(cadastrarNovaProva, provaData)
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

export function* handleRealizarProva(action){
  try{
    const provaData = action.payload;
    console.log("objeto prova feita: "+JSON.stringify(provaData))
    const response = yield call(realizarProva, provaData)
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


export function* handleObterProvasCriadas(action){
  try{
    const { payload } = action
    const response = yield call(obterProvasCriadas, payload.pagina)
    console.log("aaa "+ JSON.stringify(response.data.provas))
    const data = {provasCriadas: response.data.provas}
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleObterProvasFeitas(action){
  try{
    const { payload } = action
    const response = yield call(obterProvasFeitas, payload.id)
    console.log("abaa "+ JSON.stringify(response.data))
    const data = {provasFeitas: response.data}
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleObterProvaFeita(action){
  try{
    console.log("wewe")
    const { payload } = action
    const response = yield call(obterProvaFeita, payload.id)
    console.log("abaa "+ JSON.stringify(response.data))
    const data = {corrigirProva: response.data}
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}   

export function* handleCorrigirProva(action){
  try{
 
    const { payload } = action
    console.log("wewe: "+payload.body)
    const response = yield call(corrigirProva, payload.body)
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


export function* handleObterProvasRealizadas(){
  try{
    const response = yield call(obterProvasRealizadas)
    console.log("abaa "+ JSON.stringify(response.data))
    const data = {provasFeitas: response.data}
    yield put(setProvas({...data}))
  }catch (error){
    console.log(error)
  }
}  