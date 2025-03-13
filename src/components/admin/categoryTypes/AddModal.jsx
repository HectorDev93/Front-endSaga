import React from "react";
import { connect } from "react-redux";
import {
  addCategoryType,
  setCategoryTypeDefaults,
  handleCategoryTypeChange,
  listAllCategoryTypes,
  listCategoryTypes,
  resetFields,
  editCategoryType
} from "../../../store/actions/CategoryTypeActions";
import Form from "./Form";
import AddCategoryModal from "../categories/AddModal";
import { listAllCategories } from "../../../store/actions/CategoryActions";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class AddModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add_category_modal: false,
    };
    this.submitRef = React.createRef();
    this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.setCategoryTypeDefaults();
    this.props.resetFields();
    this.props.listAllCategories();
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
  handleCategoryTypeChange(e) {
    //e.preventDefault();
    
    if(e.target){
      //console.log(e.target)
      this.props.handleCategoryTypeChange(e.target.name, e.target.value);
    }/* 
    if(e.name){
      //console.log("soy react select con: " +e.name +" " +e.id);
      this.props.categoryType.categoryType.category = e.id;
      console.log("soy react select con: " + this.props.categoryType.categoryType.category);
      //this.props.handleCategoryTypeChange(e.name, e.id);
    } */
  }

  handleSubmit(e) {
    e.preventDefault();
    let self = this;
     switch (this.props.btnAction) {
      case "Guardar":

        this.props.addCategoryType(this.props.categoryType.categoryType, function () {
          setTimeout(() => {
            // close modal
            self.props.toggle();
    
            // reset defaults
            self.props.setCategoryTypeDefaults();
    
            self.props.listCategoryTypes();
            self.props.listAllCategories();
          }, 500);
        });

        break;

        case "Actualizar":
           this.props.editCategoryType(this.props.categoryType.categoryType, this.props.categoryType.categoryType.id, function () {
            setTimeout(() => {
              // close modal
              self.props.toggle();
              // reset defaults
              self.props.setCategoryTypeDefaults();
              self.props.resetFields();
              self.props.listCategoryTypes();
              self.props.listAllCategories();
            }, 500);
          }); 
        break;
      default:
        break;
    } 
  }

  render() {
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className="">
        <form method="post" onSubmit={this.handleSubmit}>
          <ModalHeader>
            {this.props.header ? this.props.header : "Agregar tipo de incidente"}
          </ModalHeader>
          <ModalBody>
            <Form
              categoryType={this.props.categoryType.categoryType}
              all_categories={this.props.all_categories}
              create_update_spinner={
                this.props.categoryType.list_spinner
              }
              success_message={this.props.categoryType.success_message}
              error_message={this.props.categoryType.error_message}
              handleCategoryTypeChange={this.handleCategoryTypeChange}
              openAddCategoryModal={this.openAddCategoryModal.bind(this)}
              validation_errors={this.props.categoryType.validation_errors}
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
        <AddCategoryModal
          isOpen={this.state.show_add_category_modal}
          toggle={this.closeAddCategoryModal.bind(this)}
        />
      </Modal>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categoryType: state.categoryType,
    all_categories: state.category.all_categories,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleCategoryTypeChange: (field, value, checked = null) =>
    dispatch(handleCategoryTypeChange(field, value, checked)),
    addCategoryType: (name, cb) => dispatch(addCategoryType(name, cb)),
    editCategoryType: (dsc, id, cb) => dispatch(editCategoryType(dsc, id, cb)),
    setCategoryTypeDefaults: () => dispatch(setCategoryTypeDefaults()),
    listAllCategoryTypes: () => dispatch(listAllCategoryTypes()),
    listAllCategories: () => dispatch(listAllCategories()),
    listCategoryTypes: () => dispatch(listCategoryTypes()),
    resetFields: () => dispatch(resetFields())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddModal);
