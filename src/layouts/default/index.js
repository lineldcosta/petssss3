"use strict";
import React from 'react';
import Loadable from 'react-loadable';
import InitLoader from "../../components/initLoader";

const LazyFooter = Loadable({
  loader: () => import("./footer"),
  LoadingComponent: InitLoader,
//  delay: 200,
//  serverSideRequirePath: path.join(__dirname, './another-component')
});
const Header = require("./header").default;
const Layout = (props) => {
  return (
    <div className="page-wrapper">
      <Header />
        {props.children}
      <LazyFooter/>
    </div>
  );

}

export default Layout;
