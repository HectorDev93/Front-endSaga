import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import { getRole } from "../../store/actions/UserActions";
import If, { Else } from "if-else-react";
//const Sidebar = (props) => {

const Sidebar2 = () => {
    const [userRole] = useState(localStorage.getItem("user.role_id"));
    const [admin, setAdmin] = useState(false);
    const [moder, setModer] = useState(false);
    const [view, setView] = useState(false);
  
/* if(window.location.pathname === "/login"){
        document.body.classList.remove("login-page");
        document.body.classList.remove("bg");
        document.body.classList.add("skin-green");
} */ 

    useEffect(() => {
       
       // setUserRole(localStorage.getItem("user.role_id"));
        

    getRoleUser(userRole);
    }, [userRole]);
    
const getRoleUser = (userRole) => {
    if (userRole === "1") {
        setAdmin(true);
      }
      if (userRole === "2") {
       setModer(true);
      }
      if (userRole === "3") {
        setView(true);
      }
}
    return window.location.pathname !== "/login" ? (
        // <!-- Main Sidebar Container -->
        <aside key={localStorage.getItem("user.id")} className="main-sidebar sidebar-dark-primary elevation-4">
          {/* <!-- Brand Logo --> */}
          <Link to="/admin" className="brand-link" style={{'textDecoration': 'none'}}>
            <img
              src="/images/1.png"
              alt="SAGA"
              className="brand-image img-circle elevation-3"
              style={{ opacity: 0.8 }}
            />
            <span className="brand-text font-weight-light">
              <b>SA</b>GA
            </span>
          </Link>
  
          {/* <!-- Sidebar --> */}
          <div className="sidebar">
            {/* <!-- Sidebar user panel (optional) --> */}
            <div className="user-panel mt-3 pb-3 mb-3 d-flex">
              <div className="image">
                <img
                  src="/adminlte/img/default.png"
                  className="img-circle elevation-2"
                  alt="User Image"
                />
              </div>
              <div  style={{'color': 'white'}} className="info">
               {localStorage.getItem("user.name") ? localStorage.getItem("user.name").substring(0, Math.min(24,localStorage.getItem("user.name").length))
  :null}
              </div>
            </div>
  
            {/* <!-- Sidebar Menu --> */}
            <nav className="mt-2">
              <ul
                className="nav nav-pills nav-sidebar flex-column"
                data-widget="treeview"
                role="menu"
                data-accordion="false"
              >
                {/* <!-- Add icons to the links using the .nav-icon className
                           with font-awesome or any other icon font library --> */}
  
                {/* <MenuLink activeOnlyWhenExact={true} to="/admin" label="Dashboard" icon="fas fa-tachometer-alt"/> */}
  
                {/* {this.props.user.role === "Administrador" ? "asd" : null} */}
                {/* {console.log(this.state.admin)} */}
                <If key={admin} condition={admin === true || moder === true}>
                  <MenuLink
                    to="/admin/categories"
                    label="Categorias"
                    icon="fas fa-clipboard-list"
                  />
                  <MenuLink
                    to="/admin/categoryTypes"
                    label="Sub-categorias"
                    icon="fas fa-list-ul"
                  />
                  <MenuLink
                    to="/admin/societies"
                    label="Sociedades"
                    icon="fas fa-city"
                  />
                  <MenuLink
                    to="/admin/collaborators"
                    label="Colaboratores"
                    icon="fas fa-hard-hat"
                  />
                  <MenuLink
                    to="/admin/locations"
                    label="Localidades"
                    icon="fas fa-globe"
                  />
                  <MenuLink
                    to="/admin/departments"
                    label="Departmentos"
                    icon="fas fa-building"
                  />
                  <MenuLink
                    to="/admin/requests"
                    label="Actividades"
                    icon="fas fa-running"
                  />
                  <Else />
                </If>
                
               
              </ul>
            </nav>
            {/* <!-- /.sidebar-menu --> */}
          </div>
          {/* <!-- /.sidebar --> */}
        </aside>
      ) : null;
  };
  
function MenuLink({ label, to, icon, activeOnlyWhenExact }) {
    let match = useRouteMatch({
      path: to,
      exact: activeOnlyWhenExact,
    });
  
    return (
      <li className={match ? "nav-item active" : "nav-item"}>
        <Link className="nav-link" to={to}>
          <i className={"nav-icon " + icon}></i>
          <p>{label}</p>
        </Link>
      </li>
    );
  }
  
  const mapStateToProps = (state, ownProps) => {
    return {
      user: state.user,
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getRole: (user) => dispatch(getRole(user)),
    };
  };
  //export default withRouter(Sidebar);
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(withRouter(Sidebar2));
  //export default Sidebar;