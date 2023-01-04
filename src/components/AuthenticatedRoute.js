import React, {  } from 'react';
import { Route } from 'react-router-dom';
import { Redirect, withRouter } from'react-router';

/* 
const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => localStorage.getItem("user.token")? (
      <Component {...props}/>
  ):(
      <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
  )
  } />
); */


const AuthenticatedRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => localStorage.getItem("user.id")? (
      <Component {...props}/>
  ):(
      <Redirect to={{pathname: "/login", state: {from: props.location}}}/>
  )
  } />
);
export default withRouter(AuthenticatedRoute);