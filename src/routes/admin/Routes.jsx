import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import AuthenticatedRoute from '../../components/AuthenticatedRoute';
import Dashboard from "../../components/admin/dashboard/Dashboard";
import Categories from "../../components/admin/categories/Category";
import CategoryTypes from "../../components/admin/categoryTypes/CategoryType";
import Departments from "../../components/admin/departments/Department";
import Collaborator from "../../components/admin/collaborators/Collaborator";
import Locations from "../../components/admin/locations/Location";
import Requess from "../../components/admin/requess/Reques";
import Societies from "../../components/admin/societies/Society";
import Users from "../../components/admin/users/User";
//import E404 from "../../components/common/error/E404";
class Routes extends React.Component {
  render() {
    return (
      <Switch>
         <Route path='/login' component={Login} /> 
        <Route exact path="/">
          <Redirect to="/admin" />
        </Route>
        <AuthenticatedRoute exact path="/admin" component={Dashboard} />
        <AuthenticatedRoute exact path="/admin/categories" component={Categories} />
        <AuthenticatedRoute exact path="/admin/categoryTypes" component={CategoryTypes} />
        <AuthenticatedRoute exact path="/admin/societies" component={Societies} />
        <AuthenticatedRoute exact path="/admin/locations" component={Locations} />
        <AuthenticatedRoute exact path="/admin/departments" component={Departments} />
        <AuthenticatedRoute exact path="/admin/collaborators" component={Collaborator} />
        <AuthenticatedRoute exact path="/admin/users" component={Users} />
        <AuthenticatedRoute exact path="/admin/requests" component={Requess} />
        {/* <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/admin/categories" component={Categories} />
        <Route exact path="/admin/categoryTypes" component={CategoryTypes} />
        <Route exact path="/admin/societies" component={Societies} />
        <Route exact path="/admin/locations" component={Locations} />
        <Route exact path="/admin/departments" component={Departments} />
        <Route exact path="/admin/collaborators" component={Collaborator} />
        <Route exact path="/admin/users" component={Users} />
        <Route exact path="/admin/requests" component={Requess} /> */}
        <Route exact path="*">
          <Redirect to="/admin" />
        </Route>
      </Switch>
    );
  }
}

export default Routes;
