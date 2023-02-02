import { call, put } from "@redux-saga/core/effects";
import { setAuth } from "../../application/autenticacaoSlice";
import { logar } from "../requests/autenticacaoRequest";

export function* handleLogar(action) {
  try {
    const data = action.payload;
    const response = yield call(logar, data);
    yield put(setAuth({ ...response.data }));
    alert("sucesso");
  } catch (error) {
    if (error.message.includes("404")) {
      alert("Email não encontrado!");
    } else if (error.message.includes("401")) {
      alert("Senha incorreta!");
    } else {
      alert("erro!");
    }
  }
}
