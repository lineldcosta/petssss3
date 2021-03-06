"use strict";

import 'fonts/font-awesome.css';
//import 'fonts/elegant-fonts.css';
import 'bootstrap/css/bootstrap.css';
import 'css/style.css';

import AddContainer from '../../components/add/addcontainer';
import React, {Component} from 'react';

const commonLibraries = () => {
  return new Promise((resolve, reject) => {
    require.ensure([], (require) =>{
      //  require('fonts/font-awesome.css');
        require('fonts/elegant-fonts.css');
        require('js/jquery-2.2.1.min.js');
        require('js/jquery-migrate-1.2.1.min.js');
        require('bootstrap/js/bootstrap.min.js');
        require('js/custom.js');
        resolve();
    })
  })

}

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    commonLibraries().then(() =>{
        this.forceUpdate();
    })
  }
  /*
  shouldComponentUpdate(nextProps, nextState){
    console.log("comes")
  }*/
  render(){
    const positionStyle = {
        position: 'fixed'
      };
      return (
        <header id="page-header" style={positionStyle}>
            <nav>
                <div className="left">
                    <a href="/" className="brand"><img src="assets/img/logo.png" alt="" /></a>
                    <a href="javascript:;" className="location" > Bangalore </a>
                </div>
                <div className="right">
                    <div className="primary-nav has-mega-menu">
                        <ul className="navigation">
                            <li className="active has-child"><a href="#nav-homepages">Home</a>
                                <div className="wrapper">
                                    <div id="nav-homepages" className="nav-wrapper">
                                        <ul>
                                            <li><a href="index-map-version-1.html">Map Full Screen Sidebar Results</a></li>
                                            <li><a href="index-map-version-2.html">Map Horizontal Form</a></li>
                                            <li><a href="index-map-version-3.html">Map Full Screen Form in Sidebar</a></li>
                                            <li><a href="index-map-version-4.html">Map Form Under</a></li>
                                            <li><a href="index-hero-version-1.html">Hero One Input Form</a></li>
                                            <li><a href="index-hero-version-2.html">Hero Multiple Inputs</a></li>
                                            <li><a href="index-hero-version-3.html">Hero Form Under</a></li>
                                            <li><a href="index-hero-version-4.html">Hero Full Screen Slider</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="secondary-nav">
                        <a href="#" className="promoted" data-modal-external-file="modal_sign_in.php" data-target="modal-sign-in"><i className="fa fa-sign-in"></i><span>Sign In</span></a>
                        <a href="#" className="promoted" data-modal-external-file="modal_register.php" data-target="modal-register"><i className="fa fa-user"></i><span>Register</span></a>
                    </div>
                    <div className="nav-btn">
                        <i></i>
                        <i></i>
                        <i></i>
                    </div>
                </div>
            </nav>
        </header>
      )
  }
}
export default Header;
