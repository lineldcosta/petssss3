"use strict";

import React from 'react';

const Footer = (props) =>{
  return (
    <footer id="page-footer">
        <div className="footer-wrapper">
            <div className="block">
                <div className="container">
                    <div className="vertical-aligned-elements">
                        <div className="element width-50">
                            <p data-toggle="modal" data-target="#myModal">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque aliquam at neque sit amet vestibulum. <a href="#">Terms of Use</a> and <a href="#">Privacy Policy</a>.</p>
                        </div>
                        <div className="element width-50 text-align-right">
                            <a href="#" className="circle-icon"><i className="social_twitter"></i></a>
                            <a href="#" className="circle-icon"><i className="social_facebook"></i></a>
                            <a href="#" className="circle-icon"><i className="social_youtube"></i></a>
                        </div>
                    </div>
                    <div className="background-wrapper">
                        <div className="bg-transfer opacity-50">
                            <img src="assets/img/footer-bg.png" alt="" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-navigation">
                <div className="container">
                    <div className="vertical-aligned-elements">
                        <div className="element width-50">(C) 2016 Your Company, All right reserved</div>
                        <div className="element width-50 text-align-right">
                            <a href="index.html">Home</a>
                            <a href="listing-grid-right-sidebar.html">Listings</a>
                            <a href="submit.html">Submit Item</a>
                            <a href="contact.html">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )

}

export default Footer;
