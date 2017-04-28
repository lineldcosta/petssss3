"use strict";

import {MODAL_STATE, BREEDS, ADDLISTING } from "./actionType";

export function switchModalState(state){
  return {
    type : MODAL_STATE,
    payload : {
      'open' : state
    }
  }
}

export function getbreeds(value){
  return {
    type : BREEDS,
    payload : value
  }
}

export function addListing(value){
  return {
    type : ADDLISTING,
    payload : value
  }
}
