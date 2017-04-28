"use strict";

import {MY_LISTS, GET_MY_LISTS_ERROR} from "./../../pages/listing/actionType";
const INITIAL_STATE = { lists : [], lists_error : ""};

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case MY_LISTS:
        return {...state, lists : action.payload };
        break;

        case GET_MY_LISTS_ERROR :
        return {...state, lists_error : action.payload };
        break;
    }
  return state;
}
