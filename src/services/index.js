"use strict";

import { createStore, applyMiddleware, compose } from 'redux';
import createReducer from "./store";
import createSagaMiddleware, { END } from 'redux-saga';


export function injectAsyncReducer(store, name, asyncReducer) {
  if (store.asyncReducers[name]) return;

  store.asyncReducers[name] = asyncReducer;
  store.replaceReducer(createReducer(store.asyncReducers));
}

export const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState: Object) {
  const store = createStore(createReducer(), initialState, compose(applyMiddleware(sagaMiddleware)));
  store.asyncReducers = {};
  store.runSaga = sagaMiddleware.run;
  store.close = () => {
    store.dispatch(END);
  };

  return store;
}