import {takeLatest} from "redux-saga/effects";
import { handleCriarConteudo, handleObterConteudos } from "./handlers/conteudoHandler";
import {criarConteudo, getConteudos} from '../application/conteudoSlice'
import { cadastrarNovaProva, corrigirProva, corrigirQuestoesMultiplaEscolha, getProva, getProvaFeita, getProvas, getProvasCriadas, getProvasFeitas, getProvasRealizadas, realizarProva } from "../application/provaSlice";
import { handleCadastrarNovaProva, handleCorrigirProva, handleCorrigirQuestoesMultiplaEscolha, handleObterProva, handleObterProvaFeita, handleObterProvas, handleObterProvasCriadas, handleObterProvasFeitas, handleObterProvasRealizadas, handleRealizarProva } from "./handlers/provaHandler";
import { cadastrarNovaQuestao, getQuestoes } from "../application/questaoSlice";
import { handleCriarQuestao, handleObterQuestoes } from "./handlers/questaoHandler";


export function* watcherSaga(){
  yield takeLatest(getConteudos.type, handleObterConteudos)
  yield takeLatest(criarConteudo.type, handleCriarConteudo)
  yield takeLatest(getProvas.type, handleObterProvas)
  yield takeLatest(getProva.type, handleObterProva)
  yield takeLatest(cadastrarNovaProva.type, handleCadastrarNovaProva)
  yield takeLatest(cadastrarNovaQuestao.type, handleCriarQuestao)
  yield takeLatest(getQuestoes.type, handleObterQuestoes)
  yield takeLatest(realizarProva.type, handleRealizarProva)
  yield takeLatest(getProvasCriadas.type, handleObterProvasCriadas)
  yield takeLatest(getProvasFeitas.type, handleObterProvasFeitas)
  yield takeLatest(getProvaFeita.type, handleObterProvaFeita)
  yield takeLatest(corrigirProva.type, handleCorrigirProva)
  yield takeLatest(getProvasRealizadas.type, handleObterProvasRealizadas)

  
  
  
  
  

  
}