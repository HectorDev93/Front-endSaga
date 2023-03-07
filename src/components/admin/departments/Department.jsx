import React from "react";
import HeaderContent from "../../common/HeaderContent";
//bloque redux
import { connect } from "react-redux";
import {
  deleteDepartment,
  editDepartment,
  listDepartments,
  resetFields,
  setDepartmentDefaults,
  showDepartment,
} from "../../../store/actions/DepartmentActions";
import { listAllSocieties } from "../../../store/actions/SocietyActions";
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
import cellEditFactory, { Type } from "react-bootstrap-table2-editor";
//tools
import Tool from "../../../util";
//alertas varias
import Swal from "sweetalert2";
import ToastrNotify from "../../common/TostrNotify";
const headerSortingStyle = { backgroundColor: "#e3edf8" };
/* 
const Societies = (props) => {
  return (
    <select
      name="society"
      id="society"
      className="form-control"
      onChange={props.handleFieldChange}
      value={props.society}
    >
      <option value="">select society</option>
      {props.all_societies.map((soc) => {
        return (
          <option key={soc.id} value={soc.name}>
            {soc.name}
          </option>
        );
      })}
    </select>
  );
}; */

class Department extends React.Component {
  constructor(props) {
    super(props);

    let dropSocieties = [];
    let labelSocieties = [];
    for (var i = 0; i < this.props.all_societies.length; i++) {
      dropSocieties[i] = this.props.all_societies[i].name;
      labelSocieties[i] = this.props.all_societies[i].name;
    }

    this.state = {
      show_add_department_modal: false,
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
          dataField: "society",
          text: "Sociedad",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center" /* ,
          editorRenderer: (editorProps, value, row, column, rowIndex, columnIndex) => (
            // eslint-disable-next-line no-sequences
            this.props.department.department.id =row.id,
            this.props.department.department.name =row.name,
            <Societies row={row} handleFieldChange={this.handleFieldChange} society={this.props.department.society} all_societies={this.props.all_societies}/>
            
            ) */,
          editor: {
            type: Type.SELECT,
            options: [
              {
                value: dropSocieties,
                label: labelSocieties,
              },
            ],
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
                  onClick={() => this.handleView(row, "Actualizar departamento")}
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
    //this.handleEdit = this.handleEdit.bind(this);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.setDepartmentDefaults();
    this.props.listDepartments();
    this.props.listAllSocieties();
  }

  openAddModal = () => {
    this.setState({
      show_add_department_modal: true,
    });
  };

  closeAddModal() {
    this.setState({
      show_add_department_modal: false,
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
    this.openAddModal();
  }
  handleView(row, option) {
    this.setState({
      header: option,
      btnAction: "Actualizar",
    });

    this.props.showDepartment(row.id);
    this.openAddModal();
  }

  handleDelete(row) {
    Swal.fire({
      title:
      "Estas seguro(a) de borrar este elemento? \n" +
        row.id +
        "-" +
        row.name +
        "-" +
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
        this.props.deleteDepartment(row.id, function () {
          setTimeout(() => {
            this.props.listDepartments();
          }, 500);
        });
      }
    });
  }
  handleUpdate(row, oldValue, newValue) {
    console.log(row);
    let self = this;
    this.props.editDepartment(row, row.id, function () {
      setTimeout(() => {
        //self.props.listAllLocations();
        self.props.listDepartments();
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
        Agregar nuevo departamento
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
          property="Departamentos"
          iconProperty="fas fa-building"
          show={this.props.department.list_spinner}
        />

        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>

                <div className="box-body">
                  <div >
                    {this.props.department.departments ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.department.departments}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "departmentList.csv",
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
                                  this.handleCreate("Agregar nuevo departamento")
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
            isOpen={this.state.show_add_department_modal}
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
    department: state.department,
    all_societies: state.society.all_societies,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listDepartments: () => dispatch(listDepartments()),
    setDepartmentDefaults: () => dispatch(setDepartmentDefaults()),
    deleteDepartment: (id) => dispatch(deleteDepartment(id)),
    showDepartment: (id) => dispatch(showDepartment(id)),
    editDepartment: (dsc, id, cb) => dispatch(editDepartment(dsc, id, cb)),
    listAllSocieties: () => dispatch(listAllSocieties()),
    resetFields: () => dispatch(resetFields()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Department);
