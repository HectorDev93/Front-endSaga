import React from "react";

import HeaderContent from "../../common/HeaderContent";
//bloque redux
import { connect } from "react-redux";
import {
  deleteReques,
  editReques,
  listRequess,
  resetFields,
  setRequesDefaults,
  showReques,
} from "../../../store/actions/RequesActions";
import { listAllSocieties } from "../../../store/actions/SocietyActions";
import { listAllDepartments } from "../../../store/actions/DepartmentActions";
import { listAllLocations } from "../../../store/actions/LocationActions";
import { listAllConditions } from "../../../store/actions/ConditionActions";
import { listAllCategoryTypes } from "../../../store/actions/CategoryTypeActions";
import { listAllCategories } from "../../../store/actions/CategoryActions";
import { listAllCollaborators } from "../../../store/actions/CollaboratorActions";
import { listAllPriorities } from "../../../store/actions/PriorityActions";

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
//import Tool from "../../../util";
//alertas varias
import Swal from "sweetalert2";
import ToastrNotify from "../../common/TostrNotify";
import { toast } from "react-toastify";

//excel
import ReactExport from "react-export-excel";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const headerSortingStyle = { backgroundColor: "#e3edf8" };

var activities = {};
var activitiesArray = [];
class Reques extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show_add_reques_modal: false,
      found: false,
      header: "",
      btnAction: "",
      actRow: [
        {
          id: "",
          numCase: "",
          description: "",
          created_at: "",
          society: "",
          department: "",
          location: "",
          condition: "",
          category: "",
          categoryType: "",
          nameColaborator: "",
          lastNameColaborator: "",
          asignedTo: "",
        },
      ],
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
          dataField: "numCase",
          text: "Caso TI",
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
          dataField: "condition",
          text: "Condición",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
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
          dataField: "categoryType",
          text: "Subcategoria",
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
        } /* 
        {
          dataField: "updated_at",
          text: "Updated at",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        }, */,
        {
          dataField: "c1Name",
          text: "Collaborator",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "c1Lname",
          text: "C. Apellido",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "description",
          text: "Descripción",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
        {
          dataField: "priority",
          text: "Prioridad",
          sort: true,
          editable: false,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
        },
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
                  className="btn btn-warning btn-sm"
                  onClick={() => this.handleView(row, "Editar actividad")}
                >
                  <i className="fas fa-edit"></i>
                </button>
                {""}
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
    //this.handleExportToExcel = this.handleExportToExcel(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    // alert(window.location.pathname)
    //var frg = window.location.pathname.split("/");

    //var result = frg[2];

    //console.log(result)

    this.props.setRequesDefaults();
    this.props.listRequess(localStorage.getItem("user.id"));
    this.props.listAllSocieties();
    this.props.listAllDepartments();
    this.props.listAllLocations();
    this.props.listAllCollaborators();
    this.props.listAllConditions();
    this.props.listAllCategories();
    this.props.listAllCategoryTypes();
    this.props.listAllPriorities();
  }

  openAddModal = () => {
    this.setState({
      show_add_reques_modal: true,
    });
  };

  closeAddModal() {
    this.setState({
      show_add_reques_modal: false,
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
  handleExportToExcel() {
    //alert("aqui voy a exportar")
    if (activitiesArray.length !== 0) {
      toast.success("Exportando");

      /* 
      <ExcelFile element={<button>Download Data With Styles</button>}>
                <ExcelSheet data={activitiesArray} name="Activities">
                    <ExcelColumn label="ID" value="id"/>
                    
                </ExcelSheet>
            </ExcelFile>
     */
      // console.log(JSON.stringify(activitiesArray));
    } else {
      //alert("debe seleccionar al menos una fila de la tabla")
      toast.error("Debe seleccionar al mernos una fila de la tabla");
    }
  }
  handleView(row, option) {
    this.setState({
      header: option,
      btnAction: "Actualizar",
    });

    this.props.showReques(row.id);
    this.openAddModal();
  }

  handleDelete(row) {
    Swal.fire({
      title:
        "Estas seguro(a) de borrar este elemento? \n" +
        row.id +
        "-" +
        row.numCase,
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
        this.props.deleteReques(row.id, function () {
          setTimeout(() => {
            this.props.listRequess(localStorage.getItem("user.id"));
          }, 500);
        });
      }
    });
  }
  handleUpdate(row, oldValue, newValue) {
    console.log(row);
    let self = this;
    this.props.editReques(row, row.id, function () {
      setTimeout(() => {
        self.props.listRequess(localStorage.getItem("user.id"));
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
    /*  const MyExportCSV = (e) => {
      const handleClick = () => {
        // props.onExport();
        e.onExport();
        alert(JSON.stringify(e));
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
      onSelect: (row, isSelect, rowIndex, e, rows) => {
        //console.log(row.id);
        //console.log(isSelect);
        //console.log(rowIndex);
        //console.log(e);
        // alert(JSON.stringify(row));
        //alert(JSON.stringify(rows));
        if (isSelect) {
          // console.log(row);
          activities = row;
          console.log(activitiesArray);
          activitiesArray.push({ ...activities });
          // console.log("agregue el dato: "+ row.id);
        } else {
          /*  (activitiesArray.findIndex(i => i.id=== row.id) > -1) ? 
          console.log("encontre a: "+ row.id ) : 
          console.log("no encontre a: " + row.id); */
          //indice = activitiesArray.indexOf(row.id)
          let indice = activitiesArray.findIndex((x) => x.id === row.id);
          //console.log(indice);
          activitiesArray.splice(indice, 1);
          //console.log("elimine el dato: "+ row.id);
        }

        // console.log("Array json de actividades"+JSON.stringify(activitiesArray));
      },
      onSelectAll: (isSelect, rows, e) => {
        // alert(JSON.stringify(rows))//console.log(e);
        if (isSelect) {
          // console.log(rows);
          // activitiesArray.push(rows);
          // console.log(activitiesArray);
          for (let i = 0; i <= rows.length - 1; i++) {
            activities = rows[i];
            activitiesArray.push({ ...activities });
            //console.log(rows[i].id);
            // alert(rows[i].id);
            /* let indice = activitiesArray.findIndex(x => x.id === rows[i].id);
 if(indice){
  // alert(" no lo encontre "+ rows[i].id);
activities = (rows[i].description);
 activitiesArray.push({...activities});
 }else{
 // alert("no encontre  "+ rows[i].id);
 } */
          }

          //console.log("Array json de actividades "+JSON.stringify(activities));
          console.log(
            "Array json de actividades" + JSON.stringify(activitiesArray)
          );
        } else {
          // console.log(rows);
          // console.log(activitiesArray);
          for (let i = 0; i <= rows.length - 1; i++) {
            const found = activitiesArray.find(
              (element) => element === rows[i].id
            );

            if (!found) {
              //alert("encontré "+ rows[i].id)
              let indice = activitiesArray.findIndex(
                (x) => x.id === rows[i].id
              );
              activitiesArray.splice(indice, 1);
            }
          }
          console.log(
            "Array json de actividades" + JSON.stringify(activitiesArray)
          );
        }
      },
    };
    const { ToggleList } = ColumnToggle;

    const renderAddTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Agregar nueva actividad
      </Tooltip>
    );
    /*   const renderExportCsvTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Export to CSV
      </Tooltip>
    ); */
    return (
      <div className="content-wrapper">
        <HeaderContent
          index="Home"
          property="Actividades"
          iconProperty="fas fa-running"
          show={this.props.reques.list_spinner}
        />
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header"></div>

                <div className="box-body">
                  <div>
                    {this.props.reques.requess ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.reques.requess}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName:
                            "Actividades de " +
                            localStorage.getItem("user.name") +
                            ".csv",
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
                                  this.handleCreate("Agregar nueva actividad")
                                }
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </OverlayTrigger>
                            ,
                            {/* 
                              <button
                                id="exportToexcel"
                                type="button"
                                className="btn btn-success"
                                onClick={() =>
                                  this.handleExportToExcel()
                                }
                              >
                                <i className="fas fa-file-excel"></i>
                              </button> */}
                            <ExcelFile
                              element={
                                <button
                                  id="exportToexcel"
                                  type="button"
                                  className="btn btn-success"
                                  onClick={() => this.handleExportToExcel()}
                                >
                                  <i className="fas fa-file-excel"></i>
                                </button>
                              }
                              name="acivitiesExcel"
                              filename={
                                "Actividades de " +
                                localStorage.getItem("user.name")
                              }
                            >
                              <ExcelSheet
                                data={activitiesArray}
                                name="Activities"
                              >
                                <ExcelColumn label="ID" value="id" />
                                <ExcelColumn
                                  label="Num. caso TI"
                                  value="numCase"
                                />
                                <ExcelColumn label="Sociedad" value="society" />
                                <ExcelColumn
                                  label="Departamento"
                                  value="department"
                                />
                                <ExcelColumn
                                  label="Localidad"
                                  value="location"
                                />
                                <ExcelColumn
                                  label="Categoria"
                                  value="category"
                                />
                                <ExcelColumn
                                  label="Sub-Categoria"
                                  value="categoryType"
                                />
                                <ExcelColumn
                                  label="Creado"
                                  value="created_at"
                                />
                                <ExcelColumn
                                  label="Colaborador nombre"
                                  value="c1Name"
                                />
                                <ExcelColumn
                                  label="Colaborador apellido"
                                  value="c1Lname"
                                />
                                <ExcelColumn
                                  label="Description"
                                  value="description"
                                />
                              </ExcelSheet>
                            </ExcelFile>
                            <br />
                            {/* <MyExportCSV {...props.csvProps} />{" "} */}
                            <ToggleList
                              contextual="success"
                              className="list-custom-class"
                              btnClassName="list-btn-custom-class"
                              {...props.columnToggleProps}
                            />
                            <br />
                            <BootstrapTable
                              {...props.baseProps}
                              selectRow={selectRow}
                              bordered={false}
                              defaultSorted={defaultSorted}
                              filter={filterFactory()}
                              filterPosition="top"
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
            all_locations={this.props.all_locations}
            isOpen={this.state.show_add_reques_modal}
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
    reques: state.reques,
    all_societies: state.society.all_societies,
    all_departments: state.department.all_departments,
    all_locations: state.location.all_locations,
    all_condition: state.condition.all_conditions,
    all_categories: state.category.all_categories,
    all_categoryTypes: state.categoryType.all_categoryTypes,
    all_collaborators: state.collaborator.all_collaborators,
    all_priorities: state.priority.all_priorities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listRequess: (user) => dispatch(listRequess(user)),
    setRequesDefaults: () => dispatch(setRequesDefaults()),
    deleteReques: (id) => dispatch(deleteReques(id)),
    showReques: (id) => dispatch(showReques(id)),
    editReques: (dsc, id, cb) => dispatch(editReques(dsc, id, cb)),
    listAllSocieties: () => dispatch(listAllSocieties()),
    listAllDepartments: () => dispatch(listAllDepartments()),
    listAllLocations: () => dispatch(listAllLocations()),
    listAllConditions: () => dispatch(listAllConditions()),
    listAllCategories: () => dispatch(listAllCategories()),
    listAllCategoryTypes: () => dispatch(listAllCategoryTypes()),
    listAllCollaborators: () => dispatch(listAllCollaborators()),
    listAllPriorities: () => dispatch(listAllPriorities()),

    resetFields: () => dispatch(resetFields()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Reques);
