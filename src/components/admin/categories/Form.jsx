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
      <div>
        <Spinner show={this.props.create_update_spinner} />
        <SuccessAlert msg={this.props.success_message} />
        <ErrorAlert msg={this.props.error_message} />

        <div className="col-md-6">
          <div
            className={`form-group ${
              this.props.validation_errors != null ? "has-error" : ""
            }`}
          >
            <label>Descripción</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Descripción"
              onChange={this.props.handleCategoryChange}
              value={this.props.category.name ? this.props.category.name : ""}
              name="name"
              //pattern="[A-Za-z]{3,20}"
             // pattern= "[A-Za-záéíóúÁÉÍÓÚñÑ]{3,20}"
             //pattern="^[A-Za-záéíóúÁÉÍÓÚñÑ]+(\s[A-Za-záéíóúÁÉÍÓÚñÑ]+)+$"
             //validacion
             //pattern="^[A-ZÁÉÍÓÚÑ][a-záéíóúñ]*(?:\s[a-záéíóúñ]+)*$"
             pattern={Tool.validTxt5}
              title="Utilice solo letras, minimo 3 caracteres, maximo 20 caracteres, espacio entre las palabras y la primera palabra debe iniciar con mayusculas"
              maxLength="20"
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.name[0]}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
