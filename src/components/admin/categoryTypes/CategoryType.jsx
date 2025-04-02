import React from "react";
import HeaderContent from "../../common/HeaderContent";
//bloque redux
import { connect } from "react-redux";
import {
  deleteCategoryType,
  editCategoryType,
  listCategoryTypes,
  resetFields,
  setCategoryTypeDefaults,
  showCategoryType,
} from "../../../store/actions/CategoryTypeActions";
import { listAllCategories } from "../../../store/actions/CategoryActions";
import { userPermissionAction } from "../../../store/actions/UserActions";
//modal
import AddModal from "./AddModal";
//bootstrap tools
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
//datatable
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
//tools
import Tool from "../../../util";
//alertas varias
import Swal from "sweetalert2";
import ToastrNotify from "../../common/TostrNotify";
import { toast } from "react-toastify";
const headerSortingStyle = { backgroundColor: "#e3edf8" };

class CategoryType extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_add_category_type_modal: false,
      cancreate: false,
      canupdate: false,
      candelete: false,
      found: false,
      header: "",
      btnAction: "",
      columns: [
        {
          dataField: "id",
          text: "ID",
          sort: true,
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "name",
          text: "Descripción",
          sort: true,
          editable: true,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
          validator: (newValue, row, column) => {
            if (!Tool.validTxtSpa.test(newValue)) {
              return {
                valid: false,
                message: "Name should be string only",
              };
            }
            return true;
          },
        },
        {
          dataField: "category",
          text: "Categoria",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "created_at",
          text: "Creado:",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },/*
        { 
          dataField: "updated_at",
          text: "Updated at",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        }, */
        {
          dataField: "id2",
          text: "Acciones",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <div>
                <button
                  id="viewDepartment"
                  type="button"
                  className="btn btn-warning btn-sm"
                  onClick={() => this.handleView(row, "Actualizar incidente")}
                >
                  <i className="fas fa-edit"></i>
                </button>{" "}
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => this.handleDelete(row)}
                >
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            );
          },
        },
      ],
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
 /*    var path = window.location.pathname.split("/");
    var permissionC = path[2];
    var permissionU = path[2];
    var permissionD = path[2];
    
    permissionC+= ".create"
    permissionU+= ".update"
    permissionD+= ".delete"
    console.log(permissionC);
    this.canCreate(localStorage.getItem("user.id"), permissionC);
    this.canUpdate(localStorage.getItem("user.id"), permissionU);
    this.canDelete(localStorage.getItem("user.id"), permissionD);
 */
    this.props.setCategoryTypeDefaults();
    this.props.listCategoryTypes();
    //this.props.listAllCategories();
  }

  openAddModal = (type) => {

    switch (type) {
      case 1:

        
          this.setState({
            show_add_category_type_modal: true,
          });
        
        break;
      case 2:

       
          this.setState({
            show_add_category_type_modal: true,
          });
        
        break;
      default:
        toast.error("No tienes permiso para crear/actualizar sub-categorias");
        break;
    }
  };

  closeAddModal() {
    this.setState({
      show_add_category_type_modal: false,
    });
  }

  handleFieldChange(e) {
    // this.props.handleDepartmentChange(e.target.name, e.target.value);
  }
  handleCreate(option) {
    this.setState({
      header: option,
      btnAction: "Guardar",
    });

    this.props.resetFields();
    this.openAddModal(1);
  }
  handleView(row, option) {
    this.setState({
      header: option,
      btnAction: "Actualizar",
    });

    this.props.showCategoryType(row.id);
    this.openAddModal(2);
  }

  handleDelete(row) {
    Swal.fire({
      title:
        "Estas seguro(a) de borrar este elemento? \n" +
        row.id +
        "-" +
        row.name +
        "-" +
        row.category,
      text: "No podras revertir la accion!",
      icon: "warning",
      timer: 2500,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteCategoryType(row.id, function () {
          setTimeout(() => {
            this.props.listCategoryTypes();
          }, 500);
        });
      }
    });
  
  }
  handleUpdate(row, oldValue, newValue) {
    console.log(row);
    let self = this;
    this.props.editCategoryType(row, row.id, function () {
      setTimeout(() => {
        self.props.listCategoryTypes();
      }, 500);
    });
  }

  canCreate(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);
    if (this.props.user.userPermission.length >= 1) {
      this.setState({
        cancreate: true
      });
    } else {
      this.setState({
        cancreate: false
      });
    }
  }
  canUpdate(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);
    if (this.props.user.userPermission.length >= 1) {
      this.setState({
        canupdate: true
      });
    } else {
      this.setState({
        canupdate: false
      });
    }
  }
  canDelete(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);
    if (this.props.user.userPermission.length >= 1) {
      this.setState({
        candelete: true
      });
     
    } else {
      this.setState({
        candelete: false
      });
    }
  }
  render() {
    const defaultSorted = [
      {
        dataField: "created_at",
        order: "desc",
      },
    ];
    const MyExportCSV = (props) => {
      const handleClick = () => {
        props.onExport();
      };
      return (
        <OverlayTrigger
          placement="top"
          delay={{ show: 200, hide: 200 }}
          overlay={renderExportCsvTooltip}
        >
          <button id="expCsv" className="btn btn-success" onClick={handleClick}>
            <i className="fas fa-file-csv"></i>
          </button>
        </OverlayTrigger>
      );
    };
    const selectRow = {
      mode: "checkbox",
      style: { backgroundColor: "#c8e6c9" },
      clickToSelect: false,
      /*   onSelectAll: (isSelect, rows, e) => {
                  console.log(isSelect);
                  console.log(rows);
                  console.log(e);
                }, */
    };
    const { ToggleList } = ColumnToggle;

    const renderAddTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Agregar tipo de incidente
      </Tooltip>
    );
    const renderExportCsvTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Export to CSV
      </Tooltip>
    );

    return (
      <div className="content-wrapper">
        <HeaderContent
          index="Home"
          property="Tipo incidente"
          iconProperty="fas fa-list-ul"
          show={this.props.categoryType.list_spinner}
        />

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>

                <div className="box-body">
                  <div style={{ width: 100 + "%" }}>
                    {this.props.categoryType.categoryTypes ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.categoryType.categoryTypes}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "categoryTypeList.csv",
                          onlyExportSelection: true,
                          exportAll: true,
                        }}
                      >
                        {(props) => (
                          <div>
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 200, hide: 200 }}
                              overlay={renderAddTooltip}
                            >
                              <button
                                id="addLocation"
                                type="button"
                                className="btn btn-primary custom-info"
                                onClick={() =>
                                  this.handleCreate("Agregar nuevo incidente")
                                }
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </OverlayTrigger>
                            ,
                            <MyExportCSV {...props.csvProps} />{" "}
                            <ToggleList
                              contextual="success"
                              className="list-custom-class"
                              btnClassName="list-btn-custom-class"
                              {...props.columnToggleProps}
                            />
                            <BootstrapTable
                              {...props.baseProps}
                              selectRow={selectRow}
                              defaultSorted={defaultSorted}
                              filter={filterFactory()}
                              pagination={paginationFactory()}
                              cellEdit={cellEditFactory({
                                mode: "dbclick",
                                blurToSave: true,
                                onStartEdit: (
                                  row,
                                  column,
                                  rowIndex,
                                  columnIndex
                                ) => {},
                                beforeSaveCell: (
                                  oldValue,
                                  newValue,
                                  row,
                                  column
                                ) => {
                                  console.log("after Saving Cell!!");
                                },
                                afterSaveCell: (
                                  oldValue,
                                  newValue,
                                  row,
                                  column
                                ) => {
                                  if (newValue !== oldValue) {
                                    this.handleUpdate(row, oldValue, newValue);
                                  }
                                },
                              })}
                              noDataIndication="Tabla esta vacia"
                              striped
                              hover
                            />
                          </div>
                        )}
                      </ToolkitProvider>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AddModal
            all_categories={this.props.all_categories}
            isOpen={this.state.show_add_category_type_modal}
            toggle={this.closeAddModal.bind(this)}
            header={this.state.header}
            btnAction={this.state.btnAction}
          />
        </section>

        <ToastrNotify />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    categoryType: state.categoryType,
    all_categories: state.category.all_categories,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listCategoryTypes: () => dispatch(listCategoryTypes()),
    setCategoryTypeDefaults: () => dispatch(setCategoryTypeDefaults()),
    deleteCategoryType: (id) => dispatch(deleteCategoryType(id)),
    showCategoryType: (id) => dispatch(showCategoryType(id)),
    editCategoryType: (dsc, id, cb) => dispatch(editCategoryType(dsc, id, cb)),
    listAllCategories: () => dispatch(listAllCategories()),
    resetFields: () => dispatch(resetFields()),
    userPermissionAction: (user, permissionAction) =>
      dispatch(userPermissionAction(user, permissionAction)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(CategoryType);
