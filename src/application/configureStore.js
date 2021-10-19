import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import {watcherSaga} from "../infrastructure/rootSaga"
import conteudoSlice from "./conteudoSlice";
import provaSlice from "./provaSlice";
import questaoSlice from "./questaoSlice";
import alternativaSlice from "./alternativaSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  conteudos: conteudoSlice,
  provas: provaSlice,
  questoes: questaoSlice,
  alternativas: alternativaSlice
})

const store =  configureStore({ 
  reducer,
  middleware: [sagaMiddleware]
 })

 sagaMiddleware.run(watcherSaga);

export default store;