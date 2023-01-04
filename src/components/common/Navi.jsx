/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {  } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
//import Auth from "../apis/Auth";
import {
  setStatisticDefaults
} from "../../store/actions/StatisticActions";

class Navi extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      openDrop: false
    }

    
     this.handleLogout = this.handleLogout.bind(this);

  }
  
  openDrop = () => {
    this.setState({
      openDrop: true,
    });
  };

  closnDrop() {
    this.setState({
      openDrop: false,
    });
  }

   
    handleLogout(e) {
      e.preventDefault();
      /* Auth.logout((response) => {
          this.props.history.push("/login");
      }, (err) => {
          alert(err.response.data.message);
      }); */
      if(localStorage.getItem("user.id")){
        localStorage.clear();
        this.props.setStatisticDefaults();
        this.props.history.push("/login");
      }
      window.location.reload();
  } 
  
componentDidUpdate(){
  window.addEventListener('storage', (e) => {
    console.log(e);
    if (e.oldValue !== e.newValue ){
      //alert("hey cambiaste el local storage");
      localStorage.clear();
      window.location.reload();
    }
    // TODO: Algunos valores útiles { key, newValue, oldvalue } = e;
});
}
  /* 
  componentDidMount()
  {
      const checkauth = setInterval(() => {
          Auth.checkAuth((response) => {}, (err) => {
              clearInterval(checkauth);
              localStorage.clear();
              this.props.history.push("/login");
          });
      }, 2000);
  }
 */
  render() {
    return window.location.pathname !== "/login" ||
      window.location.pathname === "/admin" ? (
        <nav id="nav-generic" className="main-header navbar navbar-expand navbar-white navbar-light">
        {/* <!-- Left navbar links --> */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link"
              data-widget="pushmenu"
              href="/#"
              role="button"
            >
              <i id="bars" className="fas fa-bars"></i>
            </a>
          </li>
        </ul>

        {/* <!-- Right navbar links --> */}
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" data-widget="fullscreen" role="button">
              <i id="expand" className="fas fa-expand-arrows-alt"></i>
            </a>
          </li>
        {/*   <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle"
              data-bs-toggle="dropdown"
              role="button" aria-expanded="false"
              title={localStorage.getItem("user.name")}
            >
              <div style={{ width: "50px", display: "contents" }}>
                <img
                  style={{
    width: '34px',
    height: '34px',
    marginRight: '10px',
    marginTop: '-2px'
}}
                  src="/adminlte/img/default.png"
                  className="img-fluid float-left rounded-circle"
                  alt="User Image"
                />
              </div>
              <span className="d-none d-sm-block">
                {localStorage.getItem("user.name")}
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
              <span className="dropdown-header">
                {localStorage.getItem("user.name")}
              </span>
              <div className="dropdown-divider"></div>
              <div className="dropdown-divider"></div>
               <a
                href="{{ route('logout') }}"
                onClick={{event.preventDefault();
              document.getElementById('logout-form').submit();}}
                className="dropdown-item"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>Logout
                <span className="float-right text-muted text-sm">2 days</span>
              </a> 
              <form
                id="logout-form"
                action="{{ route('logout') }}"
                method="POST"
                className="d-none;"
              ></form>
            </div>
          </li> */}
        <li className="nav-item dropdown">
        <Dropdown>
  <Dropdown.Toggle variant="default" id="dropdown-basic">
  {localStorage.getItem("user.name")}
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#">Action</Dropdown.Item>
    <Dropdown.Divider />
    
    <Dropdown.Item onClick={this.handleLogout}><i 
 className="fas fa-lock"></i>{" "}Cerrar Sesión</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          </li>
        </ul>
      </nav>
    ) : null;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setStatisticDefaults: () => dispatch(setStatisticDefaults()),
  };
};
//export default withRouter(Navi);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Navi));
//export default Nav;
