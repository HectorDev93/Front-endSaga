import React from "react";
import { connect } from "react-redux";
import {
  addReques,
  setRequesDefaults,
  handleRequesChange,
  listAllRequess,
  listRequess,
  resetFields,
  editReques,
} from "../../../store/actions/RequesActions";
import Form from "./Form";
import AddLocationModal from "../locations/AddModal2";
import AddCategoryModal from "../categories/AddModal";
import AddCategoryTypeModal from "../categoryTypes/AddModal";
import AddCollaboratorModal from "../collaborators/AddModal";
import { listAllLocations } from "../../../store/actions/LocationActions";
import { listAllCategories } from "../../../store/actions/CategoryActions";
import { listAllCategoryTypes, listCategoryTypeCategory } from "../../../store/actions/CategoryTypeActions";
import { listAllPriorities } from "../../../store/actions/PriorityActions";
import { listAllConditions } from "../../../store/actions/ConditionActions";
import { listAllCollaborators } from "../../../store/actions/CollaboratorActions";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


class AddModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          show_add_location_modal: false,
          show_add_category_modal: false,
          show_add_collaborator_modal: false,
          show_add_categoryType_modal: false,
          enabled : true
        };
        this.submitRef = React.createRef();
        this.handleRequesChange = this.handleRequesChange.bind(this);
    
        this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentDidMount() {
        this.props.setRequesDefaults();
        this.props.resetFields();
        this.props.listAllLocations();
       // this.props.listAllCategories();
        this.props.listAllCategoryTypes();
        this.props.listAllPriorities();
        this.props.listAllCollaborators();
        this.props.listAllConditions();
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

      openAddCategoryModal() {
        this.setState({
          show_add_category_modal: true,
        });
      }
      closeAddCategoryModal() {
        this.setState({
          show_add_category_modal: false,
        });
        this.props.listAllCategories();
      }
      openAddCategoryTypeModal() {
        this.setState({
          show_add_categoryType_modal: true,
        });
      }
      closeAddCategoryTypeModal() {
        this.setState({
          show_add_categoryType_modal: false,
        });
        this.props.listAllCategoryTypes();
      }
      openAddCollaboratorModal() {
        this.setState({
          show_add_collaborator_modal: true,
        });
      }
      closeAddCollaboratorModal() {
        this.setState({
          show_add_collaborator_modal: false,
        });
        this.props.listAllCollaborators();
      }
      handleRequesChange(e) {
        if (e.target) { 
          e.preventDefault();
          //console.log(e.target.name+"  "+e.target.value);
           this.props.handleRequesChange(e.target.name, e.target.value);
        if(e.target.name === "category" && e.target.value !== 0){
            
          this.props.listCategoryTypeCategory(e.target.value,function () {
              setTimeout(() => {
                this.props.listAllCategoryTypes();
              }, 500);
            }
          );
            this.setState({
            enabled: false,
          });
        }  
        }else{
         let name = "collaboratorAttended";
          let val = e.value;
          //console.log(name+"  "+val);
         // console.log(name+"  "+val);
         //console.log(this.props.reques.reques.collaboratorAttended)
         
         //console.log(this.props.all_collaborators)
    /*      
let rsp = this.props.all_collaborators.find(item => item.id === this.props.reques.reques.collaboratorAttended);
         console.log(rsp.legajo+" "+rsp.name+" "+rsp.last_name+" "+rsp.society);
        */  
         this.props.handleRequesChange(name, val);
        }

       
      }
    
      handleSubmit(e) {
        e.preventDefault();
        let self = this;
        if (this.props.btnAction === "Guardar") {
          this.props.addReques(this.props.reques.reques, function () {
            setTimeout(() => {
              // close modal
              self.props.toggle();
    
              // reset defaults
              self.props.setRequesDefaults();
              self.props.listRequess(localStorage.getItem("user.id"));
              self.props.listAllLocations();
              self.props.listAllCategories();
              self.props.listAllCategoryTypes();
              self.props.listAllCollaborators();
              
        
            }, 500);
          });
        }
        if (this.props.btnAction === "Actualizar") {
          this.props.editReques(
            this.props.reques.reques,
            this.props.reques.reques.id,
            function () {
              setTimeout(() => {
                // close modal
                self.props.toggle();
                // reset defaults
    
                self.props.setRequesDefaults();
                self.props.resetFields();
                self.props.listRequess(localStorage.getItem("user.id"));
                self.props.listAllLocations();
                self.props.listAllCategories();
                self.props.listAllCategoryTypes();
                self.props.listAllCollaborators();
              }, 500);
            }
          );
        }
      }


    render() {
        return (<Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="modal-lg">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.header ? this.props.header : "Agregar nueva actividad"}
          </ModalHeader>
          <ModalBody>
            <Form
              reques={this.props.reques.reques}
              all_locations={this.props.all_locations}
              all_categories={this.props.all_categories}
              all_categoryTypes={this.props.all_categoryTypes}
              all_priorities={this.props.all_priorities}
              all_conditions={this.props.all_conditions}
              all_collaborators={this.props.all_collaborators}
              create_update_spinner={
                this.props.reques.create_update_spinner
              }
              success_message={this.props.reques.success_message}
              error_message={this.props.reques.error_message}
              handleRequesChange={this.handleRequesChange}
              openAddCategoryModal={this.openAddCategoryModal.bind(this)}
              openAddCategoryTypeModal={this.openAddCategoryTypeModal.bind(this)}
              openAddLocationModal={this.openAddLocationModal.bind(this)}
              openAddCollaboratorModal={this.openAddCollaboratorModal.bind(this)}
              validation_errors={this.props.reques.validation_errors}
              submitRef={this.submitRef}
              enabled={this.state.enabled}
            />
          </ModalBody>
          <ModalFooter>
            <Button id="btn-generic"type="submit" color="primary">
              {this.props.btnAction ? this.props.btnAction : "Guardar"}
            </Button>
            <Button color="secondary" onClick={this.props.toggle}>
              Cancelar
            </Button>
          </ModalFooter>
        </form>
         <AddCategoryModal
          isOpen={this.state.show_add_category_modal}
          toggle={this.closeAddCategoryModal.bind(this)}
        /> 
        <AddCategoryTypeModal
        isOpen={this.state.show_add_categoryType_modal}
            toggle={this.closeAddCategoryTypeModal.bind(this)}
            btnAction={this.props.btnAction}/> 
        <AddLocationModal
          isOpen={this.state.show_add_location_modal}
          toggle={this.closeAddLocationModal.bind(this)}
        />
        <AddCollaboratorModal
        isOpen={this.state.show_add_collaborator_modal}
            toggle={this.closeAddCollaboratorModal.bind(this)}
            btnAction={this.props.btnAction}/> 
      </Modal>
        );

    }
}    

const mapStateToProps = (state, ownProps) => {
    return {
      reques: state.reques,
      all_locations: state.location.all_locations,
      all_categories: state.category.all_categories,
      all_priorities: state.priority.all_priorities,
      all_collaborators: state.collaborator.all_collaborators,
      all_categoryTypes: state.categoryType.all_categoryTypes,
      all_conditions: state.condition.all_conditions
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      handleRequesChange: (field, value, checked = null) =>
        dispatch(handleRequesChange(field, value, checked)),
      addReques: (name, cb) => dispatch(addReques(name, cb)),
      editReques: (dsc, id, cb) => dispatch(editReques(dsc, id, cb)),
      setRequesDefaults: () => dispatch(setRequesDefaults()),
      listAllRequess: () => dispatch(listAllRequess()),
      listAllLocations: () => dispatch(listAllLocations()),
      listAllCategories: () => dispatch(listAllCategories()),
      listAllPriorities: () => dispatch(listAllPriorities()),
      listAllConditions: () => dispatch(listAllConditions()),
      listAllCollaborators: () => dispatch(listAllCollaborators()),
      listAllCategoryTypes: () => dispatch(listAllCategoryTypes()),
      listCategoryTypeCategory: (id) => dispatch(listCategoryTypeCategory(id)),
      listRequess: (user) => dispatch(listRequess(user)),
      resetFields: () => dispatch(resetFields()),
    };
  };
export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
