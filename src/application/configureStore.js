import createSagaMiddleware from "@redux-saga/core";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { watcherSaga } from "../infrastructure/rootSaga";
import alternativaSlice from "./alternativaSlice";
import autenticacaoSlice from "./autenticacaoSlice";
import conteudoSlice from "./conteudoSlice";
import perfilSlice from "./perfilSlice";
import provaSlice from "./provaSlice";
import questaoSlice from "./questaoSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  conteudos: conteudoSlice,
  provas: provaSlice,
  questoes: questaoSlice,
  alternativas: alternativaSlice,
  perfil: perfilSlice,
  autenticacao: autenticacaoSlice,
});

const store = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watcherSaga);

export default store;
