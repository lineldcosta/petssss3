"use strict";

import React, {Component} from 'react';
var Modal = require('react-bootstrap-modal');
require("css/modal");
class ModalLayout extends Component{

  constructor(props){
    super(props);
  }
  render(){
    let hideFooter = "";
    if(this.props.hideFooter){
      hideFooter = "hide";
    }
    return(
      <Modal onEntering={this.props.onEntering} show={this.props.open} attentionClass={this.props.attentionClass} backdrop="static" onHide={this.props.closeModal}  aria-labelledby="ModalHeader" container={this.props.container ? this.props.container : document.body}>
       <Modal.Header closeButton>
         <Modal.Title id='ModalHeader'>{this.props.title}</Modal.Title>
       </Modal.Header>
       <Modal.Body>
         <div>
           {this.props.children}
         </div>
       </Modal.Body>
       <Modal.Footer  className={hideFooter}>
         <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
         <button className='btn btn-primary' onClick={this.props.save}>
           Save
         </button>
       </Modal.Footer>
     </Modal>
    )
  }
}
ModalLayout.propTypes = {
  open : React.PropTypes.bool,
  onHide : React.PropTypes.func,
  title : React.PropTypes.string,
  save : React.PropTypes.func
}
export default ModalLayout;
