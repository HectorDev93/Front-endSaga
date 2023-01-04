import React from 'react';
import { withRouter } from 'react-router';

const Footer = (props) => {
  return window.location.pathname !== '/login'?(
        <footer className="main-footer">
        <strong>Copyright &copy; 2021.</strong>
        All rights reserved.
        <div className="float-right d-none d-sm-inline-block">
          <b>Version</b> 1.0a
        </div>
        </footer> 
    ):null;
}
 
export default withRouter(Footer);