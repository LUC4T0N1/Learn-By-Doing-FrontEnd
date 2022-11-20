import {takeLatest} from "redux-saga/effects";
import { handleCriarConteudo, handleFiltrarConteudos, handleObterConteudos } from "./handlers/conteudoHandler";
import {criarConteudo, filtrarConteudos, getConteudos} from '../application/conteudoSlice'
import { cadastrarNovaProva, corrigirProva, getProva, getProvaFeita, getProvaPrivada, getProvasCriadas, getProvasFeitas, getProvasPorConteudo, getProvasRealizadas, realizarProva } from "../application/provaSlice";
import { handleCadastrarNovaProva, handleCorrigirProva, handleObterProva, handleObterProvaFeita, handleObterProvaPrivada, handleObterProvasCriadas, handleObterProvasFeitas, handleObterProvasPorConteudo, handleObterProvasRealizadas, handleRealizarProva } from "./handlers/provaHandler";
import { cadastrarNovaQuestao, getQuestoes } from "../application/questaoSlice";
import { handleCriarQuestao, handleObterQuestoes } from "./handlers/questaoHandler";
import { handleBuscarPerfil, handleCompletarPerfil } from "./handlers/perfilHandler";
import { completarPerfil, getPerfil } from "../application/perfilSlice";


export function* watcherSaga(){
  yield takeLatest(getConteudos.type, handleObterConteudos)
  yield takeLatest(criarConteudo.type, handleCriarConteudo)
  yield takeLatest(getProvasPorConteudo.type, handleObterProvasPorConteudo)
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
  yield takeLatest(completarPerfil.type, handleCompletarPerfil)
  yield takeLatest(getPerfil.type, handleBuscarPerfil)
  yield takeLatest(filtrarConteudos.type, handleFiltrarConteudos)
  yield takeLatest(getProvaPrivada.type, handleObterProvaPrivada)

  

  

  

  
  
  
  
  

  
}