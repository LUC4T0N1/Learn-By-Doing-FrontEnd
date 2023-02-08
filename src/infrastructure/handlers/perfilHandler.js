import { call, put } from "@redux-saga/core/effects";
import { setPerfil } from "../../application/perfilSlice";
import { buscarUsuario } from "../requests/perfilRequest";

export function* handleBuscarPerfil() {
  try {
    const response = yield call(buscarUsuario);
    const { data } = response;
    yield put(setPerfil({ ...data }));
  } catch (error) {}
}
