import React from "react";
import { connect } from "react-redux";
import {
  addCollaborator,
  setCollaboratorDefaults,
  handleCollaboratorChange,
  listAllCollaborators,
  listCollaborators,
  resetFields,
  editCollaborator,
} from "../../../store/actions/CollaboratorActions";
import Form from "./Form";
import AddSocietyModal from "../societies/AddModal";
import AddDepartmentModal from "../departments/AddModal";
import AddLocationModal from "../locations/AddModal2";
import { listAllSocieties } from "../../../store/actions/SocietyActions";
import { listAllDepartments, listDepartmentsSociety } from "../../../store/actions/DepartmentActions";
import { listAllLocations } from "../../../store/actions/LocationActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";



class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show_add_society_modal: false,
          show_add_department_modal: false,
          show_add_location_modal: false,
          enabled : true
        };
        this.submitRef = React.createRef();
        this.handleCollaboratorChange = this.handleCollaboratorChange.bind(this);
        //this.handleChange = this.handleChange.bind(this);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        this.props.setCollaboratorDefaults();
        this.props.resetFields();
        this.props.listAllSocieties();
        this.props.listAllDepartments();
        this.props.listAllLocations();
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
      openAddDepartmentModal() {
        this.setState({
          show_add_department_modal: true,
        });
      }
      closeAddDepartmentModal() {
        this.setState({
          show_add_department_modal: false,
        });
        this.props.listAllDepartments();
      }

      openAddLocationModal() {
        this.setState({
          show_add_location_modal: true,
        });
      }
      closeAddLocationModal() {
        this.setState({
          show_add_location_modal: false,
        });
        this.props.listAllLocations();
      }

      handleCollaboratorChange(e) {
        e.preventDefault();
        this.props.handleCollaboratorChange(e.target.name, e.target.value);
        
        if(e.target.name === "society" && e.target.value !== 0){
          this.props.listDepartmentsSociety(e.target.value,function () {
              setTimeout(() => {
                this.props.listAllDepartments();
              }, 500);
            }
          );
          this.setState({
            enabled: false,
          });

        }
      }
    
      handleSubmit(e) {
        e.preventDefault();
        let self = this;
        if (this.props.btnAction === "Guardar") {
          this.props.addCollaborator(this.props.collaborator.collaborator, function () {
            setTimeout(() => {
              // close modal
              self.props.toggle();
    
              // reset defaults
              self.props.setCollaboratorDefaults();
    
              self.props.listCollaborators();
              self.props.listAllSocieties();
              self.props.listAllDepartments();
              self.props.listAllLocations();
            }, 500);
          });
        }
        if (this.props.btnAction === "Actualizar") {
          this.props.editCollaborator(
            this.props.collaborator.collaborator,
            this.props.collaborator.collaborator.id,
            function () {
              setTimeout(() => {
                // close modal
                self.props.toggle();
                // reset defaults
    
                self.props.setCollaboratorDefaults();
                self.props.resetFields();
                self.props.listCollaborators();
                self.props.listAllSocieties();
                self.props.listAllDepartments();
                self.props.listAllLocations();
              }, 500);
            }
          );
        }
      }


    render() {
        return (<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-lg">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.header ? this.props.header : "Agregar nuevo(a) colaborador(ra)"}
          </ModalHeader>
          <ModalBody>
            <Form
              collaborator={this.props.collaborator.collaborator}
              all_societies={this.props.all_societies}
              all_locations={this.props.all_locations}
              all_departments={this.props.all_departments}
              create_update_spinner={
                this.props.collaborator.create_update_spinner
              }
              success_message={this.props.collaborator.success_message}
              error_message={this.props.collaborator.error_message}
              handleCollaboratorChange={this.handleCollaboratorChange}
              openAddSocietyModal={this.openAddSocietyModal.bind(this)}
              openAddDepartmentModal={this.openAddDepartmentModal.bind(this)}
              openAddLocationModal={this.openAddLocationModal.bind(this)}
              validation_errors={this.props.collaborator.validation_errors}
              submitRef={this.submitRef}
              enabled={this.state.enabled}
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
        <AddLocationModal
          isOpen={this.state.show_add_location_modal}
          toggle={this.closeAddLocationModal.bind(this)}
        />
        <AddDepartmentModal all_societies={this.props.all_societies} 
        isOpen={this.state.show_add_department_modal}
            toggle={this.closeAddDepartmentModal.bind(this)}
            btnAction={this.props.btnAction}/>
      </Modal>
        );

    }
}    

const mapStateToProps = (state, ownProps) => {
    return {
      collaborator: state.collaborator,
      all_societies: state.society.all_societies,
      all_departments: state.department.all_departments,
      all_locations: state.location.all_locations
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleCollaboratorChange: (field, value, checked = null) =>
        dispatch(handleCollaboratorChange(field, value, checked)),
      addCollaborator: (name, cb) => dispatch(addCollaborator(name, cb)),
      editCollaborator: (dsc, id, cb) => dispatch(editCollaborator(dsc, id, cb)),
      setCollaboratorDefaults: () => dispatch(setCollaboratorDefaults()),
      listAllCollaborators: () => dispatch(listAllCollaborators()),
      listAllSocieties: () => dispatch(listAllSocieties()),
      listAllDepartments: () => dispatch(listAllDepartments()),
      listAllLocations: () => dispatch(listAllLocations()),
      listCollaborators: () => dispatch(listCollaborators()),
      listDepartmentsSociety: (id) => dispatch(listDepartmentsSociety(id)),
      resetFields: () => dispatch(resetFields()),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(AddModal);