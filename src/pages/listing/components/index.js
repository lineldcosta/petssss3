"use strict";

import React, {Component} from 'react';

class Listing extends Component{

  constructor(props){
    super(props);
  }

  render(){
    return (
      <div className="container">

        <section className="page-title">
            <h1>My Listings</h1>
        </section>
        <section>
            <div className="my-items table-responsive">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Listings Detail</th>
                        <th>Phone</th>
                        <th>Reviews</th>
                        <th>Last Edited</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr className="my-item">
                        <td>
                            <div className="image-wrapper">
                                <div className="circle" data-toggle="tooltip" data-placement="right" title="Top Listing"><i className="fa fa-thumbs-up"></i></div>
                                <a href="edit-listing.html" className="image">
                                    <div className="bg-transfer">
                                        <img src="assets/img/items/1.jpg" />
                                    </div>
                                </a>
                            </div>
                            <div className="info">
                                <a href="detail.html"><h2>Spring Hotel</h2></a>
                                <figure className="location">Montenegro</figure>
                                <figure className="label label-info">Hotel</figure>
                                <div className="additional-info">
                                    <span><i className="fa fa-bed"></i>12</span>
                                    <span className="price-info">From <span className="price">$32</span><span className="appendix">/night</span></span>
                                </div>
                            </div>
                        </td>
                        <td><div className="featured yes">994593360<aside></aside></div></td>
                        <td className="reviews">45</td>
                        <td className="last-edited">Today 15:32
                            <span className="last-edit">Last edited: Today 12:35</span>
                            <div className="edit-options">
                                <a href="edit-listing.html" className="link icon"><i className="fa fa-edit"></i>Edit</a>
                                <a href="reviews.html" className="link icon"><i className="fa fa-comment"></i>Reviews</a>
                                <a href="#" className="link icon delete"><i className="fa fa-trash"></i>Delete</a>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </section>
    </div>

    )
  }
}
export default Listing;
