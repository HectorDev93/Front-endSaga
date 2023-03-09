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
            <label>Nombre</label>
            <input
              required
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={this.props.handleCategoryChange}
              value={this.props.category.name ? this.props.category.name : ""}
              name="name"
              pattern="[A-Za-z]{3,20}"
              title="Utilice solo letras, minimo 3 caracteres, maximo 20 caracteres"
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
