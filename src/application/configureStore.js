import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { watcherSaga } from "../infrastructure/rootSaga";
import autenticacaoSlice from "./autenticacaoSlice";
import perfilSlice from "./perfilSlice";
import provaSlice from "./provaSlice";
import questaoSlice from "./questaoSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  provas: provaSlice,
  questoes: questaoSlice,
  perfil: perfilSlice,
  autenticacao: autenticacaoSlice,
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
