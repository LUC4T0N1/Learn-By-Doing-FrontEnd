import {takeLatest} from "redux-saga/effects";
import { handleGetUser } from "./handlers/user";
import {getUser} from '../application/conteudoSlice'


export function* watcherSaga(){
  yield takeLatest(getUser.type, handleGetUser)
}