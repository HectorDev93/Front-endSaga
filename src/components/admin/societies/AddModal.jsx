import React from "react";
import { connect } from "react-redux";
import {
  addSociety,
  setSocietyDefaults,
  handleSocietyChange,
  listAllSocieties,
  listSocieties,
} from "../../../store/actions/SocietyActions";
import Form from "./Form";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddModal extends React.Component {
  constructor(props) {
    super(props);

    this.handleSocietyChange = this.handleSocietyChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setSocietyDefaults();
  }

  handleSocietyChange(e) {
    e.preventDefault();
    this.props.handleSocietyChange(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    this.props.addSociety(this.props.society.society, function () {
      setTimeout(() => {
        // close modal
        self.props.toggle();

        // reset defaults
        self.props.setSocietyDefaults();

        self.props.listSocieties();
      }, 500);
    });
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>Agregar nueva sociedad</ModalHeader>
          <ModalBody>
            <Form
              society={this.props.society.society}
              create_update_spinner={this.props.society.create_update_spinner}
              success_message={this.props.society.success_message} 
              error_message={this.props.society.error_message}
              handleSocietyChange={this.handleSocietyChange}
              validation_errors={this.props.society.validation_errors}
            />
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
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
    society: state.society,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleSocietyChange: (field, value, checked = null) =>
      dispatch(handleSocietyChange(field, value, checked)),
    addSociety: (name, cb) => dispatch(addSociety(name, cb)),
    setSocietyDefaults: () => dispatch(setSocietyDefaults()),
    listAllSocieties: () => dispatch(listAllSocieties()),
    listSocieties: () => dispatch(listSocieties()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
