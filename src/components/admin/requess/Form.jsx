import React from "react";
import ErrorAlert from "../../common/ErrorAlert";
import Spinner from "../../common/Spinner";
import SuccessAlert from "../../common/SuccessAlert";
import Select from "react-select";
class Form extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state={
      rsp : " "
    }
    }
componentDidMount(){
  
  if (this.props.reques.collaboratorAttended !== " ") {
    var rsp2 = this.props.all_collaborators.find(item => item.id === this.props.reques.collaboratorAttended);
  //console.log(rsp2)
  if(rsp2){
  //console.log(rsp2.legajo+" "+rsp2.name+" "+rsp2.last_name+" "+rsp2.society);
  // eslint-disable-next-line react/no-direct-mutation-state
  //this.setState.rsp = rsp2.legajo+" "+rsp2.name+" "+rsp2.last_name+" "+rsp2.society;
  //this.setState.rsp = "asd";
  }
}
}
componentDidUpdate(){

  if (this.props.reques.collaboratorAttended !== " ") {
    var rsp2 = this.props.all_collaborators.find(item => item.id === this.props.reques.collaboratorAttended);
  //console.log(rsp2)
  if(rsp2){
  //console.log(rsp2.legajo+" "+rsp2.name+" "+rsp2.last_name+" "+rsp2.society);
  // eslint-disable-next-line react/no-direct-mutation-state
  //this.setState.rsp = rsp2.legajo+" "+rsp2.name+" "+rsp2.last_name+" "+rsp2.society;
  
  }
}

}

  render() {

    return (
      <div className="row g-3">
        <Spinner show={this.props.create_update_spinner} />
        <SuccessAlert msg={this.props.success_message} />
        <ErrorAlert msg={this.props.error_message} />
        {/* num case */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              //required
              id="numCase"
              name="numCase"
              type="text"
              className="form-control"
              placeholder="Numero de caso"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.numCase ? this.props.reques.numCase : ""}
              pattern="[A-Z0-9]{7,7}"
              title="Utilice solo letras mayusculas y numeros, minimo 7 caracteres"
            maxLength="7"
            />
            <label htmlFor="numCase">Caso asistencia TI</label>
          </div>
        </div>
        {/* location */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <select
                name="location"
                id="location"
                required
                className="form-control"
                onChange={this.props.handleRequesChange}
                value={this.props.reques.location}
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
              <label htmlFor="location">Localidad</label>
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
        {/* collaborator */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="select-container">
              
                <select
                name="collaboratorAttended2"
                id="collaboratorAttended"
                disabled
                className="form-control"
                onChange={this.props.handleRequesChange}
               value={this.props.reques.collaboratorAttended}
              >
                <option value="">Selecciona colaborador</option>
                {this.props.all_collaborators.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}  {cat.last_name}  {cat.legajo}  {cat.society} ({cat.location})
                    </option>
                  );
                })}
              </select> 
              <Select 
                name="collaboratorAttended"
                id="collaboratorAttended"
                required
                //defaultValue={{label: "sad", value: this.props.reques.collaboratorAttended}}
                options={this.props.all_collaborators.map((cat) => ({
                  label:
                    cat.name +
                    " " +
                    cat.last_name +
                    " " +
                    cat.legajo +
                    " " +
                    cat.society +
                    " (" +
                    cat.location +")",
                  value: cat.id,
                }))}
                onChange={this.props.handleRequesChange}
              />
              {/* <label htmlFor="collaboratorAttended2">Colaborador</label> */}
             
            </div>
            <button id="btn-generic2"
              type="button"
              className="btn btn-primary"
              onClick={this.props.openAddCollaboratorModal.bind(this)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        {/* priority */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <select
                name="priority"
                id="priority"
                required
                className="form-control"
                onChange={this.props.handleRequesChange}
                value={this.props.reques.priority}
              >
                <option value="">selecciona prioridad</option>
                {this.props.all_priorities.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="priority">Prioridad</label>
            </div>
          </div>
        </div>
        {/* category */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <select
                name="category"
                id="category"
                required
                className="form-control"
                onChange={this.props.handleRequesChange}
                value={this.props.reques.category}
              >
                <option value="0">selecciona incidente</option>
                {this.props.all_categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="category">Incidente</label>
            </div>
            <button
            id="btn-generic2"
              type="button"
              className="btn btn-primary"
              onClick={this.props.openAddCategoryModal.bind(this)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        {/* condition */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <select
                name="condition"
                id="condition"
                required
                className="form-control"
                onChange={this.props.handleRequesChange}
                value={this.props.reques.condition}
              >
                <option value="">selecciona condición</option>
                {this.props.all_conditions.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="condition">Condición</label>
            </div>
          </div>
        </div>
        {/* sub category */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <select
                disabled={this.props.enabled ? true : null}
                name="categoryType"
                id="categoryType"
                required
                className="form-control"
                onChange={this.props.handleRequesChange}
                value={this.props.reques.categoryType}
              >
                <option value="">selecciona tipo de incidente</option>
                {this.props.all_categoryTypes.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.id}-{cat.name}
                    </option>
                  );
                })}
              </select>
              <label htmlFor="categoryType">Tipo de incidente</label>
            </div>
            <button id="btn-generic2"
              disabled={this.props.enabled ? true : null}
              type="button"
              className="btn btn-primary"
              onClick={this.props.openAddCategoryTypeModal.bind(this)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
        {/* created at */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <input
                name="created_at"
                type="datetime-local"
                className="form-control"
                placeholder="created at"
                onChange={this.props.handleRequesChange}
                value={
                  this.props.reques.created_at
                    ? this.props.reques.created_at
                    : ""
                }
              />
              <label htmlFor="created_at">Creado:</label>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="col-md-6">
          <div className="input-group">
            <div className="form-floating">
              <input
                type="hidden"
                name="support"
                value={localStorage.getItem("user.id")}
              />
              <textarea
                required
                type="textarea"
                rows="10"
                cols="50"
                className="form-control"
                placeholder="Descripción"
                onChange={this.props.handleRequesChange}
                value={
                  this.props.reques.description
                    ? this.props.reques.description
                    : ""
                }
                name="description"
              pattern="[A-Za-z0-9 :_-/\]{3,250}"
              title="Utilice solo letras, espacios, (:_-/\) , minimo 3 caracteres, maximo 250 caracteres"
            maxLength="250"
              />
              <label htmlFor="description">Descripción</label>
            </div>
          </div>
        </div>
        {/* 
        <div className="col-md-6">
          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Num Case</label>
            <input
              //required
              name="numCase"
              type="text"
              className="form-control"
              placeholder="Nun case"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.numCase ? this.props.reques.numCase : ""}
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.numCase[0]}
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
              name="location"
              id="location"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.location}
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
                <i className="fas fa-plus"></i> Add new location
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.location[0]}
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
              name="category"
              id="category"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.category}
            >
              <option value="">select category</option>
              {this.props.all_categories.map((cat) => {
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
                onClick={this.props.openAddCategoryModal.bind(this)}
              >
                <i className="fas fa-plus"></i> Add new category
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.category[0]}
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
              name="priority"
              id="priority"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.priority}
            >
              <option value="">select priority</option>
              {this.props.all_priorities.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-md-6">
          <div
            className={`input-group input-group-sm ${
              this.props.validation_errors ? "has-error" : ""
            }`}
          >
            <select
              name="collaboratorAttended"
              id="collaboratorAttended"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.collaboratorAttended}
            >
              <option value="">select collaborator</option>
              {this.props.all_collaborators.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.legajo}-{cat.name}-{cat.last_name}-{cat.society}
                  </option>
                );
              })}
            </select>
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.props.openAddCollaboratorModal.bind(this)}
              >
                <i className="fas fa-plus"></i> Add new collaborator
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.collaboratorAttended[0]}
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
              name="categoryType"
              id="categoryType"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.categoryType}
            >
              <option value="">select category type</option>
              {this.props.all_categoryTypes.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.id}-{cat.name}
                  </option>
                );
              })}
            </select>
            <span className="input-group-btn">
              <button
                type="button"
                className="btn btn-info"
                onClick={this.props.openAddCategoryTypeModal.bind(this)}
              >
                <i className="fas fa-plus"></i> Add new category type
              </button>
            </span>
          </div>
          {this.props.validation_errors != null ? (
            <div className="help-block">
              {this.props.validation_errors.categoryType[0]}
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
              name="condition"
              id="condition"
              required
              className="form-control"
              onChange={this.props.handleRequesChange}
              value={this.props.reques.condition}
            >
              <option value="">select condition</option>
              {this.props.all_conditions.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-md-6">
          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Created at</label>
            <input
              name="created_at"
              type="datetime-local"
              className="form-control"
              placeholder="created at"
              onChange={this.props.handleRequesChange}
              value={
                this.props.reques.created_at ? this.props.reques.created_at : ""
              }
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.created_at[0]}
              </div>
            ) : null}
          </div>
        </div>

        <div className="col-md-6">
          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Description</label>
            <textarea
              required
              type="textarea"
              rows="10"
              cols="50"
              className="form-control"
              placeholder="Description"
              onChange={this.props.handleRequesChange}
              value={
                this.props.reques.description
                  ? this.props.reques.description
                  : ""
              }
              name="description"
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.description[0]}
              </div>
            ) : null}
          </div>
        </div>
      */}{" "}
      </div>
    );
  }
}

export default Form;
