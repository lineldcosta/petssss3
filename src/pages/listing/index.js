"use strict";

import React, { Component } from 'react';
import ListingContainer from './containers';
import "css/mylistings.css";

class Index extends Component {

  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <ListingContainer />
      </div>
    );
  }
}

export default Index;
