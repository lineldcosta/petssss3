"use strict";

import React from 'react';
import conf from '../config';
const Layout = require("../layouts/"+conf.TEMPLATE+"/index").default;

const Base =(props) => {
  return (
    <Layout>
      <div id="page-content">
        {props.children}
      </div>
    </Layout>
  );
}

export default Base;
