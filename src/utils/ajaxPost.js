"use strict";

import React from 'react';

const AjaxPost = (url, data) => {

  return fetch(url, {
        method: "POST",
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify(data)
    })
      .then(function(data){
        return data.json();
    }).then((json) => {
        return json;
    }).catch(function(error){
        throw new Error(error);
    });
}

export default AjaxPost;
