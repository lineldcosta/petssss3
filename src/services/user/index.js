"use strict";

import {SET_USERID} from "./actionType";
const INITIAL_STATE = { userId : 5 };

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case SET_USERID:
        return {...state, userId : action.payload.userId };
        break;
    }
  return state;
}
