"use strict";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import AddComponent from './addComponent';
import {switchModalState} from './actionCreator';

class AddContainer extends Component {

  constructor(props){
    super(props);
  }
  componentDidMount(){
      $(this.refs.modal).modal({
          backdrop: "static",
          show: false
      });
  }


  AddListing = (e) => {
    this.props.dispatch(switchModalState());
    $(this.refs.modal).modal("show");
  }

  render(){

    return (
      <div>
      <a href="#" className="btn btn-primary btn-small btn-rounded icon shadow add-listing" onClick={this.AddListing} >
        <i className="fa fa-plus"></i><span>{this.props.title}</span>
      </a>
      <div ref="modal" className="modal fade">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button"
                            className="close">
                            <span>&times;</span>
                        </button>
                        <h4 className="modal-title">Title</h4>
                    </div>
                    <div className="modal-body">
                        Modal Body
                    </div>
                    <div className="modal-footer">
                        <button type="button"
                            className="btn btn-success">
                            OK
                        </button>
                        <button type="button"
                            className="btn btn-danger">
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
    return {
      modalState: state.AddListing.modalState
    };
}

export default connect(mapStateToProps)(AddContainer);
