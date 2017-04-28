import { combineReducers } from 'redux';
import AddListing from '../components/add/addReducer';
import User from '../services/user';
import Listing from '../services/listing';
//import {reducer as form} from 'redux-form';

export default function createReducer(asyncReducers = {}) {

  return combineReducers({
	  AddListing :AddListing,
//	  form,
	  User : User,
	  Listing : Listing,
    	  ...asyncReducers
  });
}  
