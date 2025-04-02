import React from "react";
import { connect } from "react-redux";
import HeaderContent from "../../common/HeaderContent";

import {
  deleteCategory,
 // deleteSociety,
  editCategory,
  //editSociety,
  listCategories,
  //listSocieties,
  setCategoryDefaults,
  //setSocietyDefaults,
  //showSociety,
} from "../../../store/actions/CategoryActions";
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
//import { toast } from "react-toastify";

const headerSortingStyle = { backgroundColor: "#e3edf8" };
var path = window.location.pathname.split("/");
var permissionC = path[2];
var permissionU = path[2];
var permissionD = path[2];

permissionC += ".create";
permissionU += ".update";
permissionD += ".delete";

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add_category_modal: false,
      cancreate: false,
      canupdate: false,
      candelete: false,
      found: false,
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
            if (!Tool.validTxt.test(newValue)) {
              return {
                valid: false,
                message: "Name should be string only",
              };
            }
            return true;
          },
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
        } /* 
            {
              dataField: "updated_at",
              text: "Actualizado",
              sort: true,
              editable: false,
              filter: textFilter(),
              headerSortingStyle,
              headerAlign: "center",
              align: "center",
            }, */,
        {
          dataField: "id2",
          text: "Acciones",
          editable: false,
          formatter: (cellContent, row) => {
            return (
              <div>
                {/* <button
                        className="btn btn-info hide"
                        onClick={() => this.handleView(row)}
                      >
                        <i className="fas fa-eye"></i>
                      </button> */}{" "}
                <button
                  id="deleteCat"
                  className="botonEliminar btn btn-danger btn-sm"
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
    //this.loadPermission = this.loadPermission.bind(this);
    //  this.canCreate = this.canCreate.bind(this);
  }

  componentDidMount() {
    /* para manejar permisos */

    /*console.log(localStorage.getItem("user.id")+permissionC);
    console.log(permissionU);
    console.log(permissionD); */
    //this.loadPermission();
    /* fin manejar permisos */
    this.props.setCategoryDefaults();
    this.props.listCategories();
    //this.canCreate(localStorage.getItem("user.id"), permissionC);
    //console.log(this.props.user.userPermissionAction);
  }
loadPermission(){
  this.canCreate(localStorage.getItem("user.id"), permissionC);
  this.canUpdate(localStorage.getItem("user.id"), permissionU);
  this.canDelete(localStorage.getItem("user.id"), permissionD);
}
  openAddModal = () => {
    this.setState({
      show_add_category_modal: true,
    });
    //e.preventDefault();
   /*  if (this.state.cancreate) {
      this.setState({
        show_add_category_modal: true,
      });
    } else {
      toast.error("No tienes permiso para crear categorias");
    } */
    /* 
  this.canCreate(localStorage.getItem("user.id"), permissionC, function () {
   // console.log("aqui");
    setTimeout(() => {
      if(this.state.cancreate){
        this.setState({
          show_add_category_modal: true,
        });
        }else{
          toast.error("No tienes permiso para crear categorias");
        }
    }, 1);
  }); */
 
  };

  closeAddModal() {
    this.setState({
      show_add_category_modal: false,
    });
    this.props.setCategoryDefaults()
  }
  handleDelete(row) {
      Swal.fire({
        title:
          "Estas seguro(a) de eliminar este elemento? \n" +
          row.id +
          "-" +
          row.name,
        text: "No podras revertir esta acción",
        icon: "warning",
        timer: 2500,
        timerProgressBar: true,
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.props.deleteCategory(row.id, function () {
            setTimeout(() => {
              this.props.listCategories();
            }, 500);
          });
        }
      });
   
  }
  handleUpdate(row, oldValue, newValue) {
    let self = this;
    this.props.editCategory(row, row.id, function () {
      setTimeout(() => {
        //self.props.listAllLocations();
        self.props.listCategories();
      }, 500);
    });
  }

  canCreate(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);

    if (this.props.user.userPermission.length > 0) {
      this.setState({
        cancreate: true,
      });
    } else {
      this.setState({
        cancreate: false,
      });
    }

    /* if (this.props.user.userPermission.length > 0) {
      this.setState({
        cancreate: true
      });
    } else {
      this.setState({
        cancreate: false
      });
    } */
  }

  canUpdate(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);
    if (this.props.user.userPermission > 0) {
      this.setState({
        canupdate: true,
      });
    } else {
      this.setState({
        canupdate: false,
      });
    }
  }
  canDelete(id, permissionAction) {
    this.props.userPermissionAction(id, permissionAction);
    if (this.props.user.userPermission > 0) {
      this.setState({
        candelete: true,
      });
    } else {
      this.setState({
        candelete: false,
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
    /* si se quiere exportar excel
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
    }; */
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
        Agregar nuevo incidente
      </Tooltip>
    );
   /*  const renderExportCsvTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Exportar a CSV
      </Tooltip>
    ); */

    return (
      <div className="content-wrapper">
        <HeaderContent
          index="Home"
          property="Incidentes"
          iconProperty="fas fa-clipboard-list"
          show={this.props.category.list_spinner}
        />

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>

                <div className="box-body">
                  <div>
                    {this.props.category.categories ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.category.categories}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "categoryList.csv",
                          onlyExportSelection: true,
                          exportAll: true,
                        }}
                      >
                        {(props) => (
                          <div>
                            {/*   {this.canCreate(
                              localStorage.getItem("user.id"),
                              "categories.create"
                            ) ? ( */}
                            <OverlayTrigger
                              placement="top"
                              delay={{ show: 50, hide: 50 }}
                              overlay={renderAddTooltip}
                            >
                              <button
                                id="addLocation"
                                type="button"
                                className="btn btn-primary custom-info"
                                onClick={this.openAddModal.bind(this)}
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </OverlayTrigger>
                            {/*       ) : null} */},
                            {/* <MyExportCSV {...props.csvProps} />{" "} */}
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
                              noDataIndication="La tabla esta vacia"
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
            isOpen={this.state.show_add_category_modal}
            toggle={this.closeAddModal.bind(this)}
          />
        </section>

        <ToastrNotify />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    category: state.category,
    user: state.user,
    //userPermission: state.userPermission
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listCategories: () => dispatch(listCategories()),
    setCategoryDefaults: () => dispatch(setCategoryDefaults()),
    deleteCategory: (id) => dispatch(deleteCategory(id)),
    editCategory: (dsc, id, cb) => dispatch(editCategory(dsc, id, cb)),
    userPermissionAction: (user, permissionAction) =>
      dispatch(userPermissionAction(user, permissionAction)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Category);
