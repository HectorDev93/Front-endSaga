import React, {  } from "react";
import { Link, useRouteMatch } from "react-router-dom";
import { withRouter } from "react-router";
import { connect } from "react-redux";

import {
  getRole,
  userMenu,
  setUserDefaults,
} from "../../store/actions/UserActions";
//import If, { Else } from "if-else-react";
import Spinner from "./Spinner";
//const Sidebar = (props) => {

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    document.body.classList.remove("login-page");
    document.body.classList.remove("bg");
    document.body.classList.add("skin-green");
    this.state = {
      role: localStorage.getItem("user.role_id"),
      admin: false,
      moder: false,
      view: false,
    };
    this.getRoleUser = this.getRoleUser.bind(this);
  }

  componentDidMount() {
    /* if(this.props.location.state){
alert(this.props.location.state.detail);
} */

    /* if(this.state.role === "1"){
       this.setState({
         admin: true
       }); 
     
     }else{
      
     } */
    //alert(localStorage.getItem("user.id"));
    /* const user = localStorage.getItem("user.id");
if(user){
    if (this.props.getRole(user) !== null) {
      //this.state.role = this.props.user.role[0];
      if (this.props.user.role[0] === "Administrador") {
        this.setState({
          admin: true,
        });
      }
      if (this.props.user.role[0] === "Moderador") {
        this.setState({
          moder: true,
        });
      }
      if (this.props.user.role[0] === "Visualizador") {
        this.setState({
          view: true,
        });
      }
    }
  } */
    //alert(this.props.user.role);
    //this.highChartsRender();
    this.getRoleUser(this.props.user.role);
    this.props.userMenu(localStorage.getItem("user.id"));
    //this.forceUpdate();
  }

  componentDidUpdate(prevProps) {
    //this.getRoleUser(this.props.user.role);
    const locationChanged = this.props.location !== prevProps.location;
    if (locationChanged) {
      //this.forceUpdate();
      if (this.props.location.state) {
        this.props.userMenu(localStorage.getItem("user.id"));
      }

      /* 
useEffect(() => {
   console.log(location); //esta línea se ejecuta la primera vez que se renderiza y en todos los cambios que location tenga, aqui siempre tendrás el ultimo valor de location
}, [location]) */
    }
  }
  componentWillUnmount() {
    this.props.setUserDefaults();
  }
  getRoleUser(user) {
    //this.props.getRole(user);
    //console.log(this.props.user.role[0]);
    //console.log(user);
    if (user === "1") {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.setState({
        admin: true,
      });

      return;
    }
    if (user === "2") {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.setState({
        moder: true,
      });
      return;
    }
    if (user === "3") {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.setState({
        view: true,
      });
      return;
    }
  }

  render() {
    return window.location.pathname !== "/login" ? (
      // <!-- Main Sidebar Container -->
      <aside
        key={localStorage.getItem("user.id")}
        className="main-sidebar sidebar-light-lightblue elevation-4"
      >
        {/* <!-- Brand Logo --> */}
        <Link
          to="/admin"
          className="brand-link bg-generic"
          style={{ textDecoration: "none" }}
        >
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
                alt="User"
              />
            </div>
            <div className="info">
              {localStorage.getItem("user.name")
                ? localStorage
                    .getItem("user.name")
                    .substring(
                      0,
                      Math.min(24, localStorage.getItem("user.name").length)
                    )
                : null}
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
              {/*  <If key={this.state.admin} condition={this.state.admin === true || this.state.moder === true}>
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
              </If> */}
              {/* 
              <li className="nav-item menu-open">
            <a id="este" href="#" className="nav-link active">
              <i className="nav-icon fas fa-city"></i>
              <p>
                Organización
                <i className="right fas fa-angle-left"></i>
              </p>
            </a>
            <ul className="nav nav-treeview">
            <MenuLink
                  to="/admin/categories"
                  label="Categorias"
                  icon="fas fa-clipboard-list"
                />
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="far fa-circle nav-icon"></i>
                  <p>Inactive Page</p>
                </a>
              </li>
            </ul>
          </li> */}

              <li style={{ width: "20%", margin: "auto" }}>
                <Spinner show={this.props.user.spinner} />
              </li>
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
            {/*   {this.props.user.allUserMenu.map((um) => {
                return (
                  <MenuLink
                    key={um.id}
                    to={um.url}
                    label={um.label}
                    icon={um.icon}
                  />
                );
              })} */}
            </ul>
          </nav>
          {/* <!-- /.sidebar-menu --> */}
        </div>
        {/* <!-- /.sidebar --> */}
      </aside>
    ) : null;
  }
}

function MenuLink({ label, to, icon, activeOnlyWhenExact }) {
  let match = useRouteMatch({
    path: to,
    exact: activeOnlyWhenExact,
  });

  return (
    <li id="nav-item" className={match ? "nav-item active" : "nav-item"}>
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
    userMenu: (user) => dispatch(userMenu(user)),
    setUserDefaults: () => dispatch(setUserDefaults()),
  };
};
//export default withRouter(Sidebar);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Sidebar));
//export default Sidebar;
