"use strict";

import {GET_MY_LISTS} from './actionType';

export const getMyListings = (userId) => {
  return {
    type : GET_MY_LISTS,
    payload : {
      userId : userId
    }
  }
}
