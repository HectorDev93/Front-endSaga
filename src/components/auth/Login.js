import React, { Component } from "react";
import { withRouter } from "react-router";
import Auth from "../../components/apis/Auth";

import { toast } from "react-toastify";
import ToastrNotify from "../common/TostrNotify";
import ButtonSpinner from "../common/ButtonSpinner";
class Login extends Component {
  constructor(props) {
    super(props);

    document.body.classList.remove("skin-green");
    document.body.classList.add("login-page");
    document.body.classList.add("bg");

    this.state = {
      username: "",
      password: "",
      error_message: null,
      errors: null,
      isLoading: false,
      labelButton: "Entrar",
    };

    this.handleSubmit = this.handleSubmit.bind(this);

    this.handleUsername = this.handleUsername.bind(this);

    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  handlePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      error_message: null,
      errors: null,
      isLoading: true
    });

    /* if (this.state.username === "" || this.state.password === "") {
      this.setState({
        error_message: "Please enter login credentials",
      });

      return false;
    } */

    Auth.login(
      { username: this.state.username, password: this.state.password },
      (response) => {
        // if(response.data.user.is_admin == 1) {
        if (response.data.user) {

         // console.log(response.data.user);
          //localStorage.setItem("user.id", response.data.user.id);
         for (var i in response.data.user) {
            localStorage.setItem("user." + i, response.data.user[i]);
            //<Redirect to={{pathname: "/"}}/>
          } 
          /* setTimeout(() => {
              //return (<Redirect to="/" />);
              //this.props.history.push("/admin");
            }, 100); */
            this.props.history.push("/admin");
            this.props.history.push({
              pathname: '/admin',
              state: { role: true }
            })
            
      //window.location.reload();
        } else {
          localStorage.clear();

           this.setState({
            isLoading: false,
          });
        
            toast.error("Usuario o clave incorrecta");
         
        }
      },
      (err) => {
        toast.error(err.response.data.message);
        this.setState({isLoading: false, errors: err.response.data.errors
        })
       /*  this.setState({
          error_message: err.response.data.message,
          errors: err.response.data.errors,
          isLoading: false
        }); */
      }
    );
  }

  render() {
    return (
      <div className="login-box">
        <div className="card-transparent shadow rounded login-transparent">
          <div className="card-header text-center">
            <div className="login-logo">
              <b>SA</b>GA
              <hr></hr>
              <p className="nameSystem"><b>Sistema de Administración y </b>Gestión de Actividades IT</p>
            </div>
          </div>
          <div className="card-body">
            <div className="login-box-body">
              <p className="login-box-msg">Iniciar Sesión</p>

              {this.state.error_message ? (
                <div className="alert alert-danger">
                  {this.state.error_message}
                </div>
              ) : null}

              <form action="#" method="post" onSubmit={this.handleSubmit}>
                <div
                  className={`input-group mb-3 has-feedback ${
                    this.state.errors && this.state.errors.username
                      ? "has-error"
                      : ""
                  }`}
                >
                  <input
                    type="text"
                    required
                    name="username"
                    className="form-control"
                    placeholder="Usuario Masisa"
                    onChange={this.handleUsername}
                    value={this.state.username}
                    pattern="[A-Za-z-_]{5,20}"
                    title="Utilice solo letras y underscore, minimo 5 caracteres, maximo 20 caracteres"
                  maxLength="20"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-user"></span>
                    </div>
                  </div>
                  <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                  {this.state.errors && this.state.errors.username ? (
                    <div className="help-block">
                      {this.state.errors.username[0]}
                    </div>
                  ) : null}
                </div>
                <div
                  className={`input-group mb-3 has-feedback ${
                    this.state.errors && this.state.errors.password
                      ? "has-error"
                      : ""
                  }`}
                >
                  <input
                    type="password"
                    name="password"
                    required
                    className="form-control"
                    placeholder="Contraseña"
                    onChange={this.handlePassword}
                    value={this.state.password}
                    autoComplete="off"
                  />
                  <div className="input-group-append">
                    <div className="input-group-text">
                      <span className="fas fa-lock"></span>
                    </div>
                  </div>
                  <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                  {this.state.errors && this.state.errors.password ? (
                    <div className="help-block">
                      {this.state.errors.password[0]}
                    </div>
                  ) : null}
                </div>
                <div className="row">
                  {/*  <div className="col-8">
                    <div className="icheck-primary">
                      <input type="checkbox" id="remember" />
                      <label>Remember Me</label>
                    </div>
                  </div> */}
                  <div className="col-4">
                    {/*  <button type="submit" className="btn btn-primary btn-block">
                   Iniciar <i class="fa fa-circle-o-notch fa-spin"></i>
                    </button> */}
                    <ButtonSpinner
                      text={this.state.labelButton}
                      isLoading={this.state.isLoading}
                    />
                  </div>
                </div>
              </form>
              {/*                   
      <p className="mb-1">
        <a href="forgot-password.html">I forgot my password</a>
      </p>
      <p className="mb-0">
        <a href="register.html" className="text-center">Register a new membership</a>
      </p> */}
            </div>
          </div>
        </div>

        <ToastrNotify />
      </div>
    );
  }
}
export default withRouter(Login);
//export default Login;
