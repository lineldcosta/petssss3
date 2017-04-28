"use strict";

import {MODAL_STATE, BREEDS, ADDLISTING_SUCCESS} from "./actionType";
const INITIAL_STATE = { open: false, breeds : [] };

export default function(state = INITIAL_STATE, action){
  switch (action.type) {
    case MODAL_STATE:
        return {...state, open : action.payload.open };
        break;

    case BREEDS:
      return {...state, breeds : action.payload }
      break;

    case ADDLISTING_SUCCESS:
        return {...state, listingStatus : action.payload.status }
        break;
    }
  return state;
}
