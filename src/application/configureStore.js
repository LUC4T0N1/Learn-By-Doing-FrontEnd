import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import {watcherSaga} from "../infrastructure/rootSaga"
import conteudoSlice from "./conteudoSlice";
import provaSlice from "./provaSlice";
import questaoSlice from "./questaoSlice";
import alternativaSlice from "./alternativaSlice";
import perfilSlice from "./perfilSlice";
import autenticacaoSlice from "./autenticacaoSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  conteudos: conteudoSlice,
  provas: provaSlice,
  questoes: questaoSlice,
  alternativas: alternativaSlice,
  perfil: perfilSlice,
  autenticacao: autenticacaoSlice
})

const store =  configureStore({ 
  reducer,
  middleware: [sagaMiddleware]
 })

 sagaMiddleware.run(watcherSaga);

export default store;