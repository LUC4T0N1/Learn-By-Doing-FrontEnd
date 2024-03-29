import { call, put } from "@redux-saga/core/effects";
import {
  setProvaCriada,
  setProvas,
  setRealizarProva,
} from "../../application/provaSlice";
import {
  cadastrarNovaProva,
  corrigirProva,
  obterProva,
  obterProvaFazer,
  obterProvaFeita,
  obterProvaPrivada,
  obterProvasCriadas,
  obterProvasFeitas,
  obterProvasPorConteudo,
  obterProvasRealizadas,
} from "../requests/provaRequest";

export function* handleObterProvasPorConteudo(action) {
  try {
    const { payload } = action;
    const response = yield call(
      obterProvasPorConteudo,
      payload.pagina,
      payload.nome,
      payload.ordenacao,
      payload.idConteudo
    );
    const { data } = response;
    yield put(setProvas({ ...data }));
  } catch (error) {}
}

export function* handleObterProva(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProva, payload.idProva);
    const prova = response.data;
    const newObj = Object.assign({ selected: false }, prova);
    newObj["questoesRespondidasDto"] = [];
    yield put(setRealizarProva({ ...newObj }));
  } catch (error) {}
}

export function* handleObterProvaCriada(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProva, payload.idProva);
    const prova = response.data;
    const newObj = Object.assign({ selected: false }, prova);
    newObj["questoesRespondidasDto"] = [];
    yield put(setProvaCriada({ ...newObj }));
  } catch (error) {}
}

export function* handleObterProvaFazer(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvaFazer, payload.idProva);
    const prova = response.data;
    const newObj = Object.assign({ selected: false }, prova);
    newObj["questoesRespondidasDto"] = [];
    yield put(setRealizarProva({ ...newObj }));
  } catch (error) {}
}

export function* handleObterProvaPrivada(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvaPrivada, payload.idProva);
    const prova = response.data;
    const newObj = Object.assign({ selected: false }, prova);
    newObj["questoesRespondidasDto"] = [];
    yield put(setRealizarProva({ ...newObj }));
  } catch (error) {}
}

export function* handleCadastrarNovaProva(action) {
  try {
    const provaData = action.payload;
    const response = yield call(cadastrarNovaProva, provaData);
  } catch (error) {}
}

export function* handleObterProvasCriadas(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvasCriadas, payload.pagina);
    const data = { provasCriadas: response.data.provas };
    yield put(setProvas({ ...data }));
  } catch (error) {}
}

export function* handleObterProvasFeitas(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvasFeitas, payload.id);
    const data = { provasFeitas: response.data };
    yield put(setProvas({ ...data }));
  } catch (error) {}
}

export function* handleObterProvaFeita(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvaFeita, payload.id);
    const data = {
      provaResolvida: response.data,
    };
    yield put(setProvas({ ...data }));
  } catch (error) {}
}

export function* handleObterProvaCorrigir(action) {
  try {
    const { payload } = action;
    const response = yield call(obterProvaFeita, payload.id);
    const data = {
      corrigirProva: response.data,
      provaCorrigida: { idProvaRealizada: response.data.id, questoes: [] },
    };
    yield put(setProvas({ ...data }));
  } catch (error) {}
}

export function* handleCorrigirProva(action) {
  try {
    const { payload } = action;
    const response = yield call(corrigirProva, payload.body);
    const status = response.status;
  } catch (error) {}
}

export function* handleObterProvasRealizadas() {
  try {
    const response = yield call(obterProvasRealizadas);
    const data = { provasFeitas: response.data };
    yield put(setProvas({ ...data }));
  } catch (error) {}
}
