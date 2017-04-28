"use strict";
import React from 'react';
import moize from 'moize';

const InitLoader = ({ error, pastDelay }) => {
  let style = {
    "textAlign": "center"
  }
  if (error) {
    return <div style={style}>{error}</div>;
  } else if (pastDelay) {
    return <div  style={style}>Loading...</div>;
  } else {
    return <div  style={style}>loading...</div>;
  }
}

export default moize.react(InitLoader, {
  maxSize: 5
});
