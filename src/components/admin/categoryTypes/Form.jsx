import React from "react";
//import Select from "react-select";
import ErrorAlert from "../../common/ErrorAlert";
import Spinner from "../../common/Spinner";
import SuccessAlert from "../../common/SuccessAlert";

class Form extends React.Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props);
    this.state = {
      selectOptions: [],
      id: "",
      category: "",
    };
  }
  componentDidMount() {
    //this.setState({ id: this.props.categoryType.category, category: this.props.categoryType.categoryName });
    //this.getOptions();
  }
  handleChange(e) {
    //this.setState({ id: e.id, category: e.name });
    this.props.categoryType.category = e.id
    this.props.categoryType.categoryName = e.name
    //console.log(e)
   // this.props.handleCategoryTypeChange(e);
  }
  async getOptions() {
    const options = this.props.all_categories.map((d) => ({
      value: d.id,
      label: d.name,
    }));
    this.setState({ selectOptions: options });
  }
  render() {
    return (
      <div>
        <Spinner show={this.props.create_update_spinner} />
        <SuccessAlert msg={this.props.success_message} />
        <ErrorAlert msg={this.props.error_message} />
        <div className="row mb-3">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Nombre
          </label>
          <div className="col-sm-10">
            <input
              id="name"
              required
              type="text"
              className="form-control"
              placeholder="Nombre"
              onChange={this.props.handleCategoryTypeChange}
              value={
                this.props.categoryType.name ? this.props.categoryType.name : ""
              }
              name="name"
            />
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
              onChange={this.props.handleCategoryTypeChange}
              value={
                this.props.categoryType.name ? this.props.categoryType.name : ""
              }
              name="name"
            />
            {this.props.validation_errors != null ? (
              <div className="help-block">
                {this.props.validation_errors.name[0]}
              </div>
            ) : null}
          </div>
        </div> */}
        <div className="row mb-3">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Categoria
          </label>
          <div className="col-sm-6">
             <select
              name="category"
              id="category"
              required
              className="form-control"
              onChange={this.props.handleCategoryTypeChange}
              value={this.props.categoryType.category}
            >
              <option value="">selecciona categoria</option>
              {this.props.all_categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                );
              })}
            </select> 
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-primary"
              title="Agregar nueva categoria"
              onClick={this.props.openAddCategoryModal.bind(this)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div> {/*
        <div className="row mb-3">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Categoria
          </label>
          <div className="col-sm-6">
            <Select
           name="category"
                       onChange={this.props.handleCategoryTypeChange.bind(this)}
                      //  onChange={(e) => this.props.handleCategoryTypeChange}
                       value={this.props.categoryType.category}
                      //  onBlur={() => this.props.input.onBlur(this.props.input.value)}
                      options={this.props.all_categories}
                      getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id} // It should be unique value in the options. E.g. ID 
                      placeholder="selecciona categoria"
                    />  */}
          {/*   <Select
              name="category"
               //options={this.state.selectOptions}
             inputId={this.props.categoryType.category}
              inputValue={this.props.categoryType.categoryName}
                options={this.props.all_categories}
               // selectOptions ={{value: this.props.categoryType.category, label: this.props.categoryType.categoryName}}
            // value={{value: this.props.categoryType.category, label:this.props.categoryType.categoryName}}
            //defaultValue={{ label: this.props.categoryType.categoryName, value: this.props.categoryType.category }}
            getOptionLabel={(option) => option.name}
              getOptionValue={(option) => option.id} // It should be unique value in the options. E.g. ID
              onChange={this.handleChange.bind(this)}
            /> 
            <p>
              You have selected <strong>{this.props.categoryType.categoryName}</strong> whose id is{" "}
              <strong>{this.props.categoryType.category}</strong>
            </p>
          </div>
          <div className="col-sm-2">
            <button
              type="button"
              className="btn btn-info"
              title="Agregar nueva categoria"
              onClick={this.props.openAddCategoryModal.bind(this)}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>*/}
        {/*    <div className="col-md-6">
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
              onChange={this.props.handleCategoryTypeChange}
              value={this.props.categoryType.category}
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
     */}{" "}
      </div>
    );
  }
}

export default Form;
