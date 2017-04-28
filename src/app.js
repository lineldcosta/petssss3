'use strict';

import React, {Component} from 'react';
import { Provider } from 'react-redux';
//import { Match, Router, browserHistory } from 'react-router';
import Routes from './pages/routes';
import Index from './pages/index';
//import { Layout } from './layout';
import {
  BrowserRouter ,
  Route,
  Link,
  Redirect,
  withRouter,
  Switch
} from 'react-router-dom'

//import { BrowserRouter, browserHistory, ServerRouter, Switch } from 'react-router-dom';
//console.log("ServerRouter", ServerRouter);
//console.log(browserHistory);
type Props = {
  context?: Object,
  location?: Object,
  store: Object,
  type: string,
}

class App extends Component { // eslint-disable-line react/prefer-stateless-function


  constructor(props){
    super(props);
  }
  render() {
    const { context, location, store, type } = this.props;

   // console.log(BrowserRouter)
    return (
          <Provider store={store}>
            {type === 'client' ? (
              <BrowserRouter routes={Routes}>
              </BrowserRouter>
              ) : (
              <div>aa</div>
              )}
          </Provider>
        )}
    }

export default App;