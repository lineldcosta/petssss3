"user strict";

import React,{Component} from 'react';
import {connect} from 'react-redux';
import {switchModalState, getbreeds, addListing} from './actionCreator';
import ModalLayout from "../modalLayout";
import { Field, reduxForm } from 'redux-form';
import Select from 'react-select';
import DropzoneComponent from 'react-dropzone-component';
import DatePicker from 'react-datepicker';
import 'css/react-select.css';
import 'css/forms';
import 'css/geosuggest';
import 'css/dropzone.min.css';
import 'css/filepicker.css';
import config from '../../config';
import Geosuggest from 'react-geosuggest-plus';
import renderInput from '../form/redux-form/input-text';
import renderTextArea from '../form/redux-form/textarea';
import SelectInputCreatable from '../form/redux-form/react-select-creatable';
import SelectInput from '../form/redux-form/react-select';
import SelectInputAsync from '../form/redux-form/react-select-async';
const NotificationSystem = require('react-notification-system');
import DateTimeField from 'react-bootstrap-datetimepicker-noicon';
const moment = require("moment");


class AddComponent extends Component{

  constructor(props){
    super(props);
  }

  componentWillMount(){

    this.setState({
        open: false ,
        geoLocation : false,
        gender : "",
        tags : [],
        region : ""
        });

  }

  componentDidMount(){

    window.initMap = this.initMap;
    this.loadAsyncJS('https://maps.googleapis.com/maps/api/js?libraries=places&callback=initMap');
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.listingStatus !== this.props.listingStatus){
        this.setState({ open: false }, function(){
          this.props.dispatch(switchModalState(this.state.open));
          this._notificationSystem = this.refs.notificationSystem;
          this._notificationSystem.addNotification({
            title : "Add Listing",
            dismissible : true,
            message: "New Listing has been Added successfully",
            level: "success"
          });
        });
    }
  }

  //Load maps asynchronously
  loadAsyncJS = (src) => {
      var ref = window.document.getElementsByTagName("script")[0];
      var script = window.document.createElement("script");
      script.src = src;
      script.async = true;
      ref.parentNode.insertBefore(script, ref);
  }
  //load geo suggest Library
  initMap = () => {
      this.setState({
        geoLocation : true
      })
  }

  closeModal = () =>{
      this.setState({ open: false }, function(){
        this.props.dispatch(switchModalState(this.state.open));
      });
  }

  onEnterModal = (e) => {
    $(".modal-dialog").addClass("width-800px");
  }

  addTags = (tags) => {
    this.setState({tags : tags});
  }

  genderChange = (selGender) => {
      this.setState({
        gender : selGender,
      })
  }

  updateAge = (date) => {
    let dbDate = moment(date, "x").format("YYYY-MM-DD");
    let diff = moment(date, "x").toNow(true);
    $(this.refs.showAge).html(diff + " Older")
    this.props.change("age", dbDate);
  }
  addRegion = (selRegion) => {
    this.setState({
      region : selRegion,
      /*tags : [{
          "label" : selRegion.value,
          "value" : selRegion.value,
          "className" : "Select-create-option-placeholder"
      }]*/

    })
  }

  handleChange = (date) => {
    console.log(date);
  }

  onSuggestSelect = (suggest) => {
    //this.props.change("address", suggest.gmaps.address_components);
    this.props.change("address", suggest.label);
    this.props.change("lattitude", suggest.location.lat);
    this.props.change("longitude", suggest.location.lng);
    var map;
    var geocoder;
    var latlng = new google.maps.LatLng(suggest.location.lat, suggest.location.lng);
       var myOptions =
       {
           zoom: 15,
           center: latlng,
           mapTypeId: google.maps.MapTypeId.ROADMAP,
           disableDefaultUI: true
       };
       map = new google.maps.Map(document.getElementById("mapViewer"), myOptions);
  }

  addDefaultDescription = () => {
    this.props.change("description", "");
  }

  //get the breeds for the form filter
  getBreedsDispatch = (values, cb) => {
    return new Promise((resolve, reject) => {
        this.props.dispatch(getbreeds({ values, resolve, reject }));
    })
  }

  handleFormSubmit = (values) => {
    return new Promise((resolve, reject) => {
      this.props.dispatch(addListing({ values, resolve, reject }));
    })
  }

  render(){
    const { error, pristine, reset, submitting, handleSubmit } = this.props;

    const GenderValues = [
				{ value: "Male", label: 'Male' },
				{ value: "Female", label: 'Female' }
			];

    const ribbonStyle = {
        zIndex : 0,
        cursor: "pointer"
    };

    const componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: config.SERVER_URL+config.API_VERSION+"/listing/upload"
    };

    const djsConfig = {
      addRemoveLinks: true,
      params: {
          userId: this.props.userId
      }
    };

    var upFiles       = [];
    const props = this.props;
    const eventHandlers = {
      removedfile : function(file){
        var jsonData = JSON.parse(file.xhr.response);
        var fileName = jsonData.data[0].filename;
        upFiles = upFiles.filter(function(item) {
            return item !== fileName;
        });
        props.change("uploads", upFiles);
      },
      success: function(file){
        let data = JSON.parse(file.xhr.response);
        let filename = data.data[0].filename;
        upFiles.push(filename);
        props.change("uploads", upFiles);
      }
    }

    return (
      <div>
      <NotificationSystem ref="notificationSystem" />
      <ModalLayout hideFooter={true} attentionClass="width-800px" onEntering={this.onEnterModal} open={this.props.open} closeModal={this.closeModal} save={this.saveAndClose} container={this.props.container}>
        <form className="form inputs-underline" onSubmit={handleSubmit(this.handleFormSubmit)}>
                <section>
                    <h3>Add Pets +</h3>
                    <div className="row">
                        <div className="col-md-8 col-sm-8">
                            <div className="form-group">
                              <label htmlFor="title">Listing Title</label>
                                <Field
                                 name="title"
                                 component={renderInput}
                                 autoComplete="off" placeholder="This used as title in every listing"
                                 type="text"/>
                            </div>
                        </div>
                        <div className="col-md-4 col-sm-4">
                          <div className="form-group">
                                <label htmlFor="category">Breed Name</label>
                                  <Field
                                    name='breedType'
                                    component={SelectInputAsync}
                                    className = "reactSelect"
                                    loadMethod = {this.getBreedsDispatch}
                                    simpleValue
                                />
                          </div>
                        </div>
                    </div>
                    <div className="form-group" style={{ position: 'relative' }}>
                        <label htmlFor="description">Description</label>
                        <Field
                         id="description" rows="4" name="description" placeholder="Describe the listing /n Breed certificate"
                         component={renderTextArea}
                         autoComplete="off" placeholder="This used as title in every listing"
                         className="form-control"
                         />
                       <figure className="ribbon" onClick={this.addDefaultDescription} style={ribbonStyle}>Click here to copy the default text</figure>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6" >
                            <div className="form-group">
                              <label htmlFor="tags">Tags</label>
                                <Field
                                  name='tags'
                                  promptTextCreator={(value) => "Add new tags => "+value }
                                  component={SelectInputCreatable}
                                  className = "reactSelect"
                                  placeholder="+ Add tag (For Listing in google/yahoo)"
                                  onChange={this.addTags}
                                  multi={true}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                              <label htmlFor="gender">Gender</label>
                                <Field
                                  name='gender'
                                  options={GenderValues}
                                  component={SelectInput}
                                  className = "reactSelect"
                                  onChange={this.genderChange}
                                  simpleValue
                                />

                          </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 col-sm-6">
                            <div className="form-group">
                                <label htmlFor="title">Listing Age</label><br />
                                  <DateTimeField
                                    mode="date"
                                    inputFormat="DD-MM-YYYY"
                                    className="form-control"
                                    showToday={true}
                                    onChange={this.updateAge}
                                    maxDate={moment()}
                                    />
                                    <Field
                                     name="age"
                                     component={renderInput}
                                     type="hidden"/>
                                   <span ref="showAge">a day Older</span>
                            </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
                          <div className="form-group">
                              <label htmlFor="phone">Listing Phone</label>
                                <Field
                                 name="phone"
                                   component={renderInput}
                                 placeholder="Primary phone number used to contact"
                                 type="text"/>
                          </div>
                        </div>
                    </div>
                </section>
                <section>
                    <h3>Contact</h3>
                    <div className="row">
                        <div className="col-md-6 col-sm-6" style={{position:"relative"}}>
                            <div className="form-group">
                                <label htmlFor="address-autoComplete">Address</label>
                                  {(this.state.geoLocation) ? <Geosuggest
                                 placeholder="Start typing address"
                                 initialValue=""
                                 onSuggestSelect={this.onSuggestSelect}
                                 location={new google.maps.LatLng(13.0723449, 74.84486479999998)}
                                 radius="20" /> : <span></span>}
                            </div>
                            <div className="form-group" style={{position:"absolute", top:"68px"}}>
                              <Field
                               name="longitude"
                               component={renderInput}
                               type="hidden"/>
                               <Field
                                name="address"
                                component={renderInput}
                                type="hidden"/>
                               <Field
                                name="lattitude"
                                component={renderInput}
                                type="hidden"/>

                            </div>
                              <div className="form-group" id="mapViewer" style={{height : '150px'}}>

                              </div>
                        </div>
                        <div className="col-md-6 col-sm-6">
{/*                            <div className="form-group">
                                <label htmlFor="region">Search Listing Region</label>
                                  <Field
                                    name='listingRegion'
                                    promptTextCreator={(value) => "Add Region => "+value }
                                    component={SelectInputCreatable}
                                    className = "reactSelect"
                                    placeholder="For Google/Yahoo search purpose..."
                                    onChange={this.addRegion}
                                    multi={false}
                                  />
                            </div>
*/}
                            <div className="form-group">
                                <label htmlFor="email">Listing Email</label>
                                  <Field
                                   name="email"
                                   component={renderInput}
                                   placeholder="name@dealer.com"
                                   type="email"/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="website">Listing Website</label>
                                  <Field
                                   name="website"
                                   component={renderInput}
                                   placeholder="http://"
                                   type="text"
                                   />
                            </div>

                        </div>
                    </div>
                </section>
                <section>
                    <h3>Gallery</h3>(Click to upload Images)
                    <div className="row">
                      <div className="file-upload form-group">
                        <DropzoneComponent config={componentConfig}
                           eventHandlers={eventHandlers}
                           djsConfig={djsConfig} className="file-upload"
                           />
                      </div>
                      <div className="form-group">
                        <Field
                         name="uploads"
                         component={renderInput}
                         type="hidden"
                         />
                     </div>
                    </div>
                </section>
                <section className="center">
                  <div className="row">
                    <div className="form-group">
                      <br />
                      {error && <span  className="error">{error}<br /><br /></span>}
                        <button type="submit" disabled={submitting} className="btn btn-primary btn-rounded"> <b>+</b> Publish new Listing </button>
                    </div>
                  </div>
                </section>
            </form>
      </ModalLayout>
    </div>
    )
  }
}

const validate = (values) =>{
    const errors = {};
    if(!values.title){
      errors.title = "Please enter the title";
    }
    if(!values.gender){
      errors.gender = "Please select the gender";
    }
    if(!values.description){
      errors.description = "Please provide the description";
    }
    if(!values.breedType){
      errors.breedType = "Please select the breed";
    }
    if(!values.longitude){
      errors.longitude = "Please provide the location of breed";
    }
    if(!values.uploads){
      errors.uploads = "Please upload atleast 1 image";
    }
    if(!values.phone){
      errors.phone = "Please provide the phone number";
    }
    return errors;
}

const mapStateToProps = (state, ownProps) => {
   console.log("com State", state);
    return {
      open: state.AddListing.open,
      breeds : state.AddListing.breeds,
      listingStatus : state.AddListing.listingStatus,
      userId : state.User.userId
    };
}

const Add = reduxForm({
  form: 'AddComponentForm',  // a unique identifier for this form
  validate
})(AddComponent)

AddComponent = connect(mapStateToProps)(Add)

export default AddComponent;
