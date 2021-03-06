"use strict";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {switchModalState} from './actionCreator';
import Loadable from 'react-loadable';
import InitLoader from '../initLoader';;
import path from 'path';

let LoadableMyComponent = Loadable({
  loader: () => import('./addComponent'),
  LoadingComponent: InitLoader,
  serverSideRequirePath: path.join(__dirname, './addComponent')
});

const AddComponentLibrary = () => {
  return new Promise((resolve, reject) => {
    require.ensure([], (require) =>{
      	const store = require("./../../index").store;
      	const injectAsyncReducer = require('./../../services').injectAsyncReducer;
        const reduxFormReducer = require('redux-form').reducer;
        injectAsyncReducer(store, 'form', reduxFormReducer); 
        resolve();
    })
  })

}


class AddContainer extends Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    AddComponentLibrary().then(() =>{
        this.forceUpdate();
    })
    this.setState({ open: false })
  }


  AddListing = (e) => {
    this.setState({ open: true }, function(){
      this.props.dispatch(switchModalState(this.state.open));
    });
  }

  render(){
    const style = {
        display : "initial"
    }
    return (

      <div style={style}>
        <a href="javascript:;" className="btn btn-primary btn-small btn-rounded icon shadow add-listing" onClick={this.AddListing} >
          <i className="fa fa-plus"></i><span>{this.props.title}</span>
        </a>
        <LoadableMyComponent show={this.state.open} />
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    return {
      open: state.AddListing.open
    };
}

export default connect(mapStateToProps)(AddContainer);
