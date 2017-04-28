"use strict";

import {fork} from 'redux-saga/effects'
import { getBreedsFlow, addListingFlow } from "../components/add/actionSaga";
import {getMyListings} from '../pages/listing/actionSaga';

export default function * root () {
  yield* [fork(getBreedsFlow),
          fork(addListingFlow),
          fork(getMyListings)];
}
