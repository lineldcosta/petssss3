"use strict";

import React, {Component} from 'react';
import {connect} from 'react-redux';
import ListingComponent from './../components';
import {getMyListings} from './../actionCreator';;

class ListingContainer extends Component{

  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.dispatch(getMyListings(this.props.userId));
  }
  render(){
    console.log(this.props.lists);
    return(
      <div>
        <ListingComponent userId={this.props.userId} myListing={this.props.lists}/>
      </div>
    )
  }
}
function mapStateToProps(state, ownProps) {

    return {
      userId: state.User.userId,
      lists : state.Listing.lists
    };
}

export default connect(mapStateToProps)(ListingContainer);
