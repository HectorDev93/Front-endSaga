import React from "react";
import ErrorAlert from "../../common/ErrorAlert";
import Spinner from "../../common/Spinner";
import SuccessAlert from "../../common/SuccessAlert";
import Tool from "../../../util";

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
            required
            type="text"
            className="form-control"
            placeholder="Nombre..."
            onChange={this.props.handleCollaboratorChange}
            value={
              this.props.collaborator.name ? this.props.collaborator.name : ""
            }
            name="name"
            //pattern="[A-Za-z ]{3,35}"
            pattern={Tool.validTxt6}
           // title="Utilice solo letras y espacios, minimo 3 caracter, maximo 35 caracteres. Ej: Héctor A. o Héctor Arnaldo"
            title={Tool.txtValidPront}
            maxLength="35"
          />
          <label for="name" className="form-label">
            Nombre
          </label>
          </div>
        </div>

        <div className="col-md-6">
          <div className="form-floating">
              <input
            required
            type="text"
            className="form-control"
            placeholder="Apellido..."
            onChange={this.props.handleCollaboratorChange}
            value={
              this.props.collaborator.last_name
                ? this.props.collaborator.last_name
                : ""
            }
            name="last_name"
            //pattern="[A-Za-z ]{3,35}"
            pattern={Tool.validTxt6}
            //title="Utilice solo letras y espacios, minimo 3 caracteres, maximo 20 caracteres"
            title={Tool.txtValidPront}
            maxLength="35"
          />
          <label for="lastName" className="form-label">
            Apellido
          </label>
          </div>
        
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <input
              required
              type="text"
              className="form-control"
              placeholder="legajo"
              onChange={this.props.handleCollaboratorChange}
              value={
                this.props.collaborator.legajo
                  ? this.props.collaborator.legajo
                  : ""
              }
              name="legajo"
              //pattern="[0-9]{5,5}"
              pattern={Tool.validNum1}
              title="Utilice solo numeros, maximo 8 "
            maxLength="8"
            />
          <label for="legajo" class="form-label">
            Legajo
          </label>
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
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.society}
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
        <label for="society" className="form-label">
            Sociedad
          </label>
          </div>
          {localStorage.getItem("user.role_id") === "3" ? (
            <button
            id="btn-generic2"
                type="button"
                className="btn btn-primary"
                onClick={this.props.openAddSocietyModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
          ):null}
          </div>
        </div>
        
        <div className="col-md-6">
        <div className="input-group">
          <div className="form-floating">
          <select
              disabled={this.props.enabled ? true : null}
              name="department"
              id="department"
              required
              className="form-control"
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.department}
            >
              <option value="">selecciona departamento</option>
              {this.props.all_departments.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
           
            <label for="department" className="form-label">Departamento</label>
            </div>
          
              <button
              id="btn-generic2"
              disabled={this.props.enabled ? true : null}
                type="button"
                className="btn btn-primary"
                onClick={this.props.openAddDepartmentModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
</div>
         

        </div>
        <div className="col-md-6">
          <div className="input-group">
              <div className="form-floating">
              <select
              name="location"
              id="location"
              required
              className="form-control"
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.location}
            >
              <option value="">selecciona localidad</option>
              {this.props.all_locations.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label for="location">Localidad</label>
              </div>
              {localStorage.getItem("user.role_id") === "3" ? (
          
              <button
              id="btn-generic2"
                type="button"
                className="btn btn-primary"
                onClick={this.props.openAddLocationModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
              ):null}
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
                onChange={this.props.handleCollaboratorChange}
                value={
                  this.props.collaborator.name ? this.props.collaborator.name : ""
                }
                name="name"
              />
              {this.props.validation_errors != null ? (
                <div className="help-block">
                  {this.props.validation_errors.name[0]}
                </div>
              ) : null}
            </div> 
            
            <div
              className={`form-group ${
                this.props.validation_errors != null ? "has-error" : ""
              }`}
            >
              <label>Last name</label>
              <input
                required
                type="text"
                className="form-control"
                placeholder="Last name"
                onChange={this.props.handleCollaboratorChange}
                value={
                  this.props.collaborator.last_name ? this.props.collaborator.last_name : ""
                }
                name="last_name"
              />
              {this.props.validation_errors != null ? (
                <div className="help-block">
                  {this.props.validation_errors.last_name[0]}
                </div>
              ) : null}
            </div>

          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Legajo</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="legajo"
              onChange={this.props.handleCollaboratorChange}
              value={
                this.props.collaborator.legajo
                  ? this.props.collaborator.legajo
                  : ""
              }
              name="legajo"
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.legajo[0]}
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
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.society}
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

        <div className="col-md-6">
          <div
            className={`input-group input-group-sm ${
              this.props.validation_errors ? "has-error" : ""
            }`}
          >
            <select
              name="department"
              id="department"
              required
              className="form-control"
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.department}
            >
              <option value="">select department</option>
              {this.props.all_departments.map((cat) => {
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
                onClick={this.props.openAddDepartmentModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.department[0]}
            </div>
          ) : null}
        </div>

        <div className="col-md-6">
          <div
            className={`input-group input-group-sm ${
              this.props.validation_errors ? "has-error" : ""
            }`}
          >
            <select
              name="location"
              id="location"
              required
              className="form-control"
              onChange={this.props.handleCollaboratorChange}
              value={this.props.collaborator.location}
            >
              <option value="">select location</option>
              {this.props.all_locations.map((cat) => {
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
                onClick={this.props.openAddLocationModal.bind(this)}
              >
                <i className="fas fa-plus"></i>
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.location[0]}
            </div>
          ) : null}
        </div>
        */}
      </div>
    );
  }
}

export default Form;
