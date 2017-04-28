"use strict";
import {take, call, put, fork, race, apply, takeLatest} from 'redux-saga/effects';
import {MY_LISTS, GET_MY_LISTS, GET_MY_LISTS_SUCCESS, GET_MY_LISTS_ERROR} from "./actionType";
import config from "../../config";
import AjaxPost from '../../utils/ajaxPost';

export function* getMyListings() {

  while(true){
    const {payload : {userId}} = yield take('GET_MY_LISTS');
    try{

      let {output, success, error} = yield race({
        output  : call(getLists, userId),
        success : take(GET_MY_LISTS_SUCCESS),
        error : take(GET_MY_LISTS_ERROR)
      })
      if(success){
        yield put({type : MY_LISTS , payload : success.payload.data});
      }
      if(error){
        yield put({type : GET_MY_LISTS_ERROR , "payload" : error.payload});
      }
    } catch(e){
      yield put({type : GET_MY_LISTS_ERROR , payload : e});
    }
  }
}

function* getLists(userId){

    let url   = config.SERVER_URL+config.API_VERSION+"/listing/getListing";
    let result = yield call(AjaxPost, url, {userId});
    if(result.status != 200){
          yield put({type : GET_MY_LISTS_ERROR, payload : result.errors[0].message});
    }else{
          yield put({type : GET_MY_LISTS_SUCCESS, payload : result})
    }

}
