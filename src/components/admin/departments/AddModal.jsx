import React from "react";
import { connect } from "react-redux";
import {
  addDepartment,
  setDepartmentDefaults,
  handleDepartmentChange,
  listAllDepartments,
  listDepartments,
  resetFields,
  editDepartment,
} from "../../../store/actions/DepartmentActions";
import Form from "./Form";
import AddSocietyModal from "../societies/AddModal";
import { listAllSocieties } from "../../../store/actions/SocietyActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add_society_modal: false,
    };
    this.submitRef = React.createRef();
    this.handleDepartmentChange = this.handleDepartmentChange.bind(this);
    //this.handleChange = this.handleChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setDepartmentDefaults();
    this.props.resetFields();
    // this.props.listAllSocieties();
  }

  openAddSocietyModal() {
    this.setState({
      show_add_society_modal: true,
    });
  }
  closeAddSocietyModal() {
    this.setState({
      show_add_society_modal: false,
    });
    this.props.listAllSocieties();
  }
  handleDepartmentChange(e) {
    e.preventDefault();
    this.props.handleDepartmentChange(e.target.name, e.target.value);
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
    if (this.props.btnAction === "Guardar") {
      this.props.addDepartment(this.props.department.department, function () {
        setTimeout(() => {
          // close modal
          self.props.toggle();

          // reset defaults
          self.props.setDepartmentDefaults();

          self.props.listDepartments();
          self.props.listAllSocieties();
        }, 500);
      });
    }
    if (this.props.btnAction === "Actualizar") {
      this.props.editDepartment(
        this.props.department.department,
        this.props.department.department.id,
        function () {
          setTimeout(() => {
            // close modal
            self.props.toggle();
            // reset defaults

            self.props.setDepartmentDefaults();
            self.props.resetFields();
            self.props.listDepartments();
            self.props.listAllSocieties();
          }, 500);
        }
      );
    }
    /* switch (this.props.btnAction) {
      case "Save":

        this.props.addDepartment(this.props.department.department, function () {
          setTimeout(() => {
            // close modal
            self.props.toggle();
    
            // reset defaults
            self.props.setDepartmentDefaults();
    
            self.props.listDepartments();
            self.props.listAllSocieties();
          }, 500);
        });

        break;

        case "Update":
          //delete this.props.department.department.society;
          console.log(this.props.department.department);
           this.props.editDepartment(this.props.department.department, this.props.department.department.id, function () {
            setTimeout(() => {
              // close modal
              self.props.toggle();
      this.setState({
        show_add_department_modal: false,
      });
              // reset defaults
              self.props.setDepartmentDefaults();
              self.props.resetFields();
              self.props.listDepartments();
              self.props.listAllSocieties();
            }, 500);
          }); 
        break;
      default:
        break;
    } */
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.header ? this.props.header : "Agregar nuevo departamento"}
          </ModalHeader>
          <ModalBody>
            <Form
              department={this.props.department.department}
              all_societies={this.props.all_societies}
              create_update_spinner={
                this.props.department.create_update_spinner
              }
              success_message={this.props.department.success_message}
              error_message={this.props.department.error_message}
              handleDepartmentChange={this.handleDepartmentChange}
              openAddSocietyModal={this.openAddSocietyModal.bind(this)}
              validation_errors={this.props.department.validation_errors}
              submitRef={this.submitRef}
            />
          </ModalBody>
          <ModalFooter>
            <Button id="btn-generic" type="submit" color="primary">
              {this.props.btnAction ? this.props.btnAction : "Guardar"}
            </Button>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
        <AddSocietyModal
          isOpen={this.state.show_add_society_modal}
          toggle={this.closeAddSocietyModal.bind(this)}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    department: state.department,
    all_societies: state.society.all_societies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleDepartmentChange: (field, value, checked = null) =>
      dispatch(handleDepartmentChange(field, value, checked)),
    addDepartment: (name, cb) => dispatch(addDepartment(name, cb)),
    editDepartment: (dsc, id, cb) => dispatch(editDepartment(dsc, id, cb)),
    setDepartmentDefaults: () => dispatch(setDepartmentDefaults()),
    listAllDepartments: () => dispatch(listAllDepartments()),
    listAllSocieties: () => dispatch(listAllSocieties()),
    listDepartments: () => dispatch(listDepartments()),
    resetFields: () => dispatch(resetFields()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
