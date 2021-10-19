import {takeLatest} from "redux-saga/effects";
import { handleCriarConteudo, handleObterConteudos } from "./handlers/conteudoHandler";
import {criarConteudo, getConteudos} from '../application/conteudoSlice'
import { cadastrarNovaProva, getProva, getProvas } from "../application/provaSlice";
import { handleCadastrarNovaProva, handleObterProva, handleObterProvas } from "./handlers/provaHandler";
import { cadastrarNovaQuestao } from "../application/questaoSlice";
import { handleCriarQuestao } from "./handlers/questaoHandler";


export function* watcherSaga(){
  yield takeLatest(getConteudos.type, handleObterConteudos)
  yield takeLatest(criarConteudo.type, handleCriarConteudo)
  yield takeLatest(getProvas.type, handleObterProvas)
  yield takeLatest(getProva.type, handleObterProva)
  yield takeLatest(cadastrarNovaProva.type, handleCadastrarNovaProva)
  yield takeLatest(cadastrarNovaQuestao.type, handleCriarQuestao)
  
}