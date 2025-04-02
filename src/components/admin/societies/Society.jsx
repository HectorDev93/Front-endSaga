import React from "react";
import HeaderContent from "../../common/HeaderContent";
//bloque redux
import { connect } from "react-redux";
import {
  deleteSociety,
  editSociety,
  listSocieties,
  setSocietyDefaults,
  resetFields
  //showSociety,
} from "../../../store/actions/SocietyActions";
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
import ToastrNotify from '../../common/TostrNotify';
const headerSortingStyle = { backgroundColor: "#e3edf8" };

class Society extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add_society_modal: false,
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
          text: "Sociedad",
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
          dataField: "description",
          text: "Descripción",
          sort: true,
          filter: textFilter(),
          headerSortingStyle,
          headerAlign: "center",
          align: "center",
          validator: (newValue, row, column) => {
            if (!Tool.validTxt.test(newValue)) {
              return {
                valid: false,
                message: "Description should be string only",
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
                {/* <button
                    className="btn btn-info hide"
                    onClick={() => this.handleView(row)}
                  >
                    <i className="fas fa-eye"></i>
                  </button> */}{" "}
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
    //this.handleView = this.handleView.bind(this);
    // this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.setSocietyDefaults();
    this.props.listSocieties();
  }
  
  openAddModal = () => {
    this.setState({
      show_add_society_modal: true,
    });
  };

  closeAddModal() {
    this.setState({
      show_add_society_modal: false,
    });
    this.props.setSocietyDefaults()
  }
  handleDelete(row) {
    Swal.fire({
      title:
        "Estas seguro(a) de borrar este elemento? \n" +
        row.id +
        "-" +
        row.name +
        "-" +
        row.description,
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
        this.props.deleteSociety(row.id, function () {
          setTimeout(() => {
            this.props.listSocieties();
          }, 500);
        });
      }
    });
  }
  handleUpdate(row, oldValue, newValue) {
    let self = this;
    this.props.editSociety(row, row.id, function () {
      setTimeout(() => {
        //self.props.listAllLocations();
        self.props.listSocieties();
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
        Agregar nueva sociedad
      </Tooltip>
    );
    const renderExportCsvTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Exportar a CSV
      </Tooltip>
    );

    return (
      <div className="content-wrapper">
        <HeaderContent
          index="Home"
          property="Sociedades"
          iconProperty="fas fa-city"
          show={this.props.society.list_spinner}
        />

<section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">

                </div>

                <div className="box-body">

                  <div style={{ width: 100 + "%" }}>
                    {this.props.society.societies ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.society.societies}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "societyList.csv",
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
                                onClick={this.openAddModal.bind(this)}
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
                                ) => {
                                },
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
            isOpen={this.state.show_add_society_modal}
            toggle={this.closeAddModal.bind(this)}
          />
        </section>

        <ToastrNotify/>
      </div>
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
    listSocieties: () => dispatch(listSocieties()),
    setSocietyDefaults: () => dispatch(setSocietyDefaults()),
    deleteSociety: (id) => dispatch(deleteSociety(id)),
    /*showSociety: (id) => dispatch(showSociety(id)),*/
      editSociety: (dsc, id) => dispatch(editSociety(dsc, id)), 
      resetFields: () => dispatch(resetFields()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Society);
