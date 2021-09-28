import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import {watcherSaga} from "../infrastructure/rootSaga"
import UserSlice from "./conteudoSlice";

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  user: UserSlice
})

const store =  configureStore({ 
  reducer,
  middleware: [sagaMiddleware]
 })

 sagaMiddleware.run(watcherSaga);

export default store;