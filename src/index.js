"use strict";
import 'babel-regenerator-runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import routes from './pages/routes';

//configure store
import {sagaMiddleware} from './services';
import rootSaga from './services/sagas';
import configureStore from './services';
import {initialState} from './services';
//import App from './app';

export const store = configureStore(
  window.__INITIAL_STATE__  // eslint-disable-line no-underscore-dangle
);
  
store.runSaga(rootSaga);

/*
ReactDOM.render(
  (<App
      store={store}
      type="client"
    />),
  document.querySelector('.page-container')
);
*/
console.log(browserHistory);
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}>
    </Router>
  </Provider>
  , document.querySelector('.page-container'));