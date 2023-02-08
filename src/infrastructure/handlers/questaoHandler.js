import { call, put } from "@redux-saga/core/effects";
import { setProva } from "../../application/provaSlice";
import { setQuestoes } from "../../application/questaoSlice";
import { criarQuestao, obterQuestoes } from "../requests/questaoRequest";

export function* handleCriarQuestao(action) {
  try {
    const { payload } = action;
    let questao = payload.questao;

    const newObj = Object.assign({ selected: false }, questao);

    const response = yield call(criarQuestao, questao);
    const status = response.status;
    newObj["id"] = response.data;
    yield put(
      setProva({
        ...payload.prova,
        questoes: payload.prova.questoes.concat(newObj),
      })
    );
  } catch (error) {}
}

export function* handleObterQuestoes(action) {
  try {
    const { payload } = action;
    const response = yield call(obterQuestoes, payload.body);
    const { data } = response;
    const retorno = { filtroQuestoes: data };
    yield put(setQuestoes({ ...retorno }));
  } catch (error) {}
}
