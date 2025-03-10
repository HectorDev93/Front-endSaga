import React from "react";
import ErrorAlert from "../../common/ErrorAlert";
import Spinner from "../../common/Spinner";
import SuccessAlert from "../../common/SuccessAlert";

class Form extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="row g-3">
        <Spinner show={this.props.create_update_spinner} />
        <SuccessAlert msg={this.props.success_message} />
        <ErrorAlert msg={this.props.error_message} />

        <div className="col-md-6">
          <div className="form-floating">

          <input
          id="name"
              required
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={this.props.handleDepartmentChange}
              value={
                this.props.department.name ? this.props.department.name : ""
              }
              name="name"
              pattern="[A-Za-z ]{3,30}"
              title="Utilice solo letras y espacios, minimo 3 caracteres, maximo 30 caracteres"
            maxLength="30"
            />
 <label for="name">Nombre</label>
            </div>
            </div>

            <div className="col-md-6">
        <div className="input-group">
          <div className="form-floating">
          <select
              name="society"
              id="society"
              required
              className="form-control"
              onChange={this.props.handleDepartmentChange}
              value={this.props.department.society}
            >
              <option value="">selecciona sociedad</option>
              {this.props.all_societies.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            
 <label for="society">Sociedad</label>
          </div>
              <button
              id="btn-generic2"
                type="button"
                className="btn btn-primary"
                onClick={this.props.openAddSocietyModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            </div>

{/* 
        <div className="col-md-6">
          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Name</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Name"
              onChange={this.props.handleDepartmentChange}
              value={
                this.props.department.name ? this.props.department.name : ""
              }
              name="name"
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.name[0]}
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-md-6">
          <div
            className={`input-group input-group-sm ${
              this.props.validation_errors ? "has-error" : ""
            }`}
          >
            <select
              name="society"
              id="society"
              required
              className="form-control"
              onChange={this.props.handleDepartmentChange}
              value={this.props.department.society}
            >
              <option value="">select society</option>
              {this.props.all_societies.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.props.openAddSocietyModal.bind(this)}
              >
                <i className="fas fa-plus"></i> Add new society
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.society[0]}
            </div>
          ) : null}
        </div>
      */} </div>
    );
  }
}

export default Form;
