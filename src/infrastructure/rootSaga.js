import { takeLatest } from "redux-saga/effects";
import { getPerfil } from "../application/perfilSlice";
import {
  cadastrarNovaProva,
  corrigirProva,
  getProva,
  getProvaCorrigir,
  getProvaCriada,
  getProvaFazer,
  getProvaFeita,
  getProvaPrivada,
  getProvasCriadas,
  getProvasFeitas,
  getProvasPorConteudo,
  getProvasRealizadas,
} from "../application/provaSlice";
import { cadastrarNovaQuestao, getQuestoes } from "../application/questaoSlice";
import { handleBuscarPerfil } from "./handlers/perfilHandler";
import {
  handleCadastrarNovaProva,
  handleCorrigirProva,
  handleObterProva,
  handleObterProvaCorrigir,
  handleObterProvaCriada,
  handleObterProvaFazer,
  handleObterProvaFeita,
  handleObterProvaPrivada,
  handleObterProvasCriadas,
  handleObterProvasFeitas,
  handleObterProvasPorConteudo,
  handleObterProvasRealizadas,
} from "./handlers/provaHandler";
import {
  handleCriarQuestao,
  handleObterQuestoes,
} from "./handlers/questaoHandler";

export function* watcherSaga() {
  yield takeLatest(getProvasPorConteudo.type, handleObterProvasPorConteudo);
  yield takeLatest(getProva.type, handleObterProva);
  yield takeLatest(getProvaCriada.type, handleObterProvaCriada);
  yield takeLatest(cadastrarNovaProva.type, handleCadastrarNovaProva);
  yield takeLatest(cadastrarNovaQuestao.type, handleCriarQuestao);
  yield takeLatest(getQuestoes.type, handleObterQuestoes);
  yield takeLatest(getProvasCriadas.type, handleObterProvasCriadas);
  yield takeLatest(getProvasFeitas.type, handleObterProvasFeitas);
  yield takeLatest(getProvaFeita.type, handleObterProvaFeita);
  yield takeLatest(getProvaCorrigir.type, handleObterProvaCorrigir);
  yield takeLatest(corrigirProva.type, handleCorrigirProva);
  yield takeLatest(getProvasRealizadas.type, handleObterProvasRealizadas);
  yield takeLatest(getPerfil.type, handleBuscarPerfil);
  yield takeLatest(getProvaPrivada.type, handleObterProvaPrivada);
  yield takeLatest(getProvaFazer.type, handleObterProvaFazer);
}
