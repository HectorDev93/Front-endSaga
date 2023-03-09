import React from "react";

import HeaderContent from "../../common/HeaderContent";
//bloque redux
import { connect } from "react-redux";
import {
  deleteCollaborator,
  editCollaborator,
  listCollaborators,
  resetFields,
  setCollaboratorDefaults,
  showCollaborator,
} from "../../../store/actions/CollaboratorActions";
import { listAllSocieties } from "../../../store/actions/SocietyActions";
import { listAllDepartments } from "../../../store/actions/DepartmentActions";
import { listAllLocations } from "../../../store/actions/LocationActions";
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
const headerSortingStyle = { backgroundColor: "#e3edf8" };

class Collaborator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_add_collaborator_modal: false,
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
          dataField: "legajo",
          text: "Legajo",
          sort: true,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "name",
          text: "Nombre",
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
          dataField: "last_name",
          text: "Apellido",
          sort: true,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "society",
          text: "Sociedad",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "department",
          text: "Departamento",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "location",
          text: "Localidad",
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
                  id="viewCollaborator"
                  type="button"
                  className="btn btn-warning  btn-sm"
                  onClick={() => this.handleView(row, "Actualizar colaborador")}
                >
                  <i className="fas fa-edit"></i>
                </button>
        
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
    //this.handleEdit = this.handleEdit.bind(this);

    this.handleView = this.handleView.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.setCollaboratorDefaults();
    this.props.listCollaborators();
    /* this.props.listAllSocieties();*/
    this.props.listAllDepartments();
    this.props.listAllLocations(); 
  }

  openAddModal = () => {
    this.setState({
      show_add_collaborator_modal: true,
    });
  };

  closeAddModal() {
    this.setState({
      show_add_collaborator_modal: false,
    });
  }

  handleCreate(option) {
    this.setState({
      header: option,
      btnAction: "Guardar",
    });

    this.props.resetFields();
    this.openAddModal();
  }
  handleView(row, option) {
    this.setState({
      header: option,
      btnAction: "Actualizar",
    });

    this.props.showCollaborator(row.id);
    this.openAddModal();
  }

  handleDelete(row) {
    Swal.fire({
      title:
      "Estas seguro(a) de borrar este elemento? \n" +
        row.id +
        "-" +
        row.legajo +
        "-" +
        row.name +
        "-" +
        row.last_name +
        " of " +
        row.society,
        text: "No podras revertir la acción!",
      icon: "warning",
      timer: 2500,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.props.deleteCollaborator(row.id, function () {
          setTimeout(() => {
            this.props.listCollaborators();
          }, 500);
        });
      }
    });
  }
  handleUpdate(row, oldValue, newValue) {
    console.log(row);
    let self = this;
    this.props.editCollaborator(row, row.id, function () {
      setTimeout(() => {
        self.props.listCollaborators();
      }, 500);
    });
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
        Agregar nuevo(a) colaborador(ra)
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
          property="Colaboradores"
          iconProperty="fas fa-hard-hat"
          show={this.props.collaborator.list_spinner}
        />
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>

                <div className="box-body">
                  <div>
                    {this.props.collaborator.collaborators ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.collaborator.collaborators}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "collaboratorList.csv",
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
                                id="addCollaborator"
                                type="button"
                                className="btn btn-primary custom-info"
                                onClick={() =>
                                  this.handleCreate("Agregar nuevo(a) colaborador(ra)")
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
            all_societies={this.props.all_societies}
            all_departments={this.props.all_departments}
            all_locations={this.props.all_locations}
            isOpen={this.state.show_add_collaborator_modal}
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
    collaborator: state.collaborator,
    all_societies: state.society.all_societies,
    all_departments: state.department.all_departments,
    all_locations: state.location.all_locations
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listCollaborators: () => dispatch(listCollaborators()),
    setCollaboratorDefaults: () => dispatch(setCollaboratorDefaults()),
    deleteCollaborator: (id) => dispatch(deleteCollaborator(id)),
    showCollaborator: (id) => dispatch(showCollaborator(id)),
    editCollaborator: (dsc, id, cb) => dispatch(editCollaborator(dsc, id, cb)),
    listAllSocieties: () => dispatch(listAllSocieties()),
    listAllDepartments: () => dispatch(listAllDepartments()),
    listAllLocations: () => dispatch(listAllLocations()),
    resetFields: () => dispatch(resetFields()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Collaborator);
