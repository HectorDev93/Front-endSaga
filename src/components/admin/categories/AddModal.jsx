import React from "react";
import { connect } from "react-redux";
import {
  listCategories,
  listAllCategories,
  setCategoryDefaults,
  addCategory,
  handleCategoryChange,
} from "../../../store/actions/CategoryActions";
import Form from "./Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setCategoryDefaults();
  }

  handleCategoryChange(e) {
    e.preventDefault();
    this.props.handleCategoryChange(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    this.props.addCategory(this.props.category.category, function () {
      setTimeout(() => {
        // close modal
        self.props.toggle();

        // reset defaults
        self.props.setCategoryDefaults();

        self.props.listCategories();
      }, 500);
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>Agregar nuevo incidente</ModalHeader>
          <ModalBody>
            <Form
              category={this.props.category.category}
              create_update_spinner={this.props.category.create_update_spinner}
              success_message={this.props.category.success_message} 
              error_message={this.props.category.error_message}
              handleCategoryChange={this.handleCategoryChange}
              validation_errors={this.props.category.validation_errors}
            />
          </ModalBody>
          <ModalFooter>
            <Button id="btn-generic" type="submit" color="primary">
              Guardar
            </Button>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCategoryChange: (field, value, checked = null) =>
      dispatch(handleCategoryChange(field, value, checked)),
    addCategory: (name, cb) => dispatch(addCategory(name, cb)),
    setCategoryDefaults: () => dispatch(setCategoryDefaults()),
    listAllCategories: () => dispatch(listAllCategories()),
    listCategories: () => dispatch(listCategories()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
