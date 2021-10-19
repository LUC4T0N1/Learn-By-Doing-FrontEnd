import { call, put } from "@redux-saga/core/effects";
import { criarQuestao } from "../requests/questaoRequest";

export function* handleCriarQuestao(action){
  try{
    const { payload } = action
    const response = yield call(criarQuestao, payload.questao)
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
