"use strict";

import {take, call, put, fork, race, apply, takeLatest} from 'redux-saga/effects';
import {BREEDS, ADDLISTING, ADDLISTING_SUCCESS, ADDLISTING_ERROR} from "./actionType";
import { SubmissionError, reset } from 'redux-form';
import config from "../../config";
import AjaxPost from '../../utils/ajaxPost';
//Better usage
// Remove getbreeds function whenever get time

export function* getBreedsFlow () {

    while (true) {
      const { payload: { values, resolve, reject } } = yield take(BREEDS);
        try {
           let q = { "q" : values};
           if(!values){
             resolve({ options: [] });
           }else{
             const breeds = yield getbreeds(q);
             resolve(breeds);
           }
        } catch (error) {
          console.log("getBreedsFlowError =>", error);
        }
    }
}

const getbreeds = (values) => {
    return fetch(config.SERVER_URL+config.API_VERSION+"/listing/getbreeds", {
          method: "POST",
          headers: new Headers({
            'Content-Type': 'application/json'
          }),
          body: JSON.stringify(values)
      })
      .then(function(data){
        return data.json();
      }).then((json) => {
          return { options: json['data'] };
      }).catch(function(e){
          return { options: [] };
      });
}


export function* addListingFlow(){

  while(true){
    const { payload: { values, resolve, reject } } = yield take(ADDLISTING);
    let {output, success, error} = yield race({
      output  : call(AddNewListing, values),
      success : take(ADDLISTING_SUCCESS),
      error : take(ADDLISTING_ERROR)
    })
    if(success){
      yield put(reset("AddComponentForm"));
      resolve();
    }
    if(error){
      reject(new SubmissionError({ _error: error.payload }));
    }
  }
}

export function* AddNewListing(values){
    try{
        let url = config.SERVER_URL+config.API_VERSION+"/listing/addListing";
        let result = yield call(AjaxPost, url, values);
        if(result.status != 200){
              yield put({type : ADDLISTING_ERROR, payload : result.errors[0].message});
              return;
        }
        yield put({type : ADDLISTING_SUCCESS, payload : { status : 1}});
    }catch(error){
        yield put({type : ADDLISTING_ERROR, payload : "Something went wrong! Please try again!!!"});
    }
}
