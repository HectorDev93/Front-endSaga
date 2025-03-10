import React from "react";
import HeaderContent from "../../common/HeaderContent";
import { connect } from "react-redux";
import {
  deleteLocation,
  editLocation,
  listLocations,
  setLocationDefaults,
  showLocation,
} from "../../../store/actions/LocationActions";
//import Spinner from "../../common/Spinner";
import AddModal2 from "./AddModal2";
//import AddModal from "./AddModal";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { ColumnToggle } from "react-bootstrap-table2-toolkit";
import cellEditFactory from "react-bootstrap-table2-editor";
import Tool from "../../../util";
import Swal from 'sweetalert2';
import ToastrNotify from "../../common/TostrNotify";

const headerSortingStyle = { backgroundColor: "#e3edf8" };

class Location extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show_add_location_modal: false,
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
          text: "Nombre",
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
    this.handleView = this.handleView.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.setLocationDefaults();
    this.props.listLocations(1);
  }

  openAddLocationModal = () => {
    this.setState({
      show_add_location_modal: true,
    });
  };

  closeAddLocationModal() {
    this.setState({
      show_add_location_modal: false,
    });
    this.props.setLocationDefaults()
  }
  handleDelete(row) {
   /*  // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure to delete? " + e)) {
      //this.props.deleteLocation(e);

      this.props.deleteLocation(e, function () {
        setTimeout(() => {
          //self.props.listAllLocations();
          this.props.listLocations(1);
        }, 500);
      });
    }
 */



    Swal.fire({
      title:
      "Estas seguro(a) de borrar este elemento? \n" +
      row.id + '-' + row.name + '-' + row.description,
      text: "No podras revertir la acción!",
      icon: 'warning',
      timer: 2500,
      timerProgressBar: true,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: "Si, eliminalo!",
    }).then((result) => {
      if (result.isConfirmed) {
        
        this.props.deleteLocation(row.id, function () {
          setTimeout(() => {
            //self.props.listAllLocations();
            this.props.listLocations(1);
          }, 500);
        });

       /*  Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        ) */
        
      

      }
    })
   
    



  }
  handleUpdate(row, oldValue, newValue) {
    //console.log("After Saving Cell!!" + JSON.stringify(row));

    let self = this;
    this.props.editLocation(row, row.id, function () {
      setTimeout(() => {
        //self.props.listAllLocations();
        self.props.listLocations(1);
      }, 500);
    });
  }
  handleView(row) {
    
    

  }
  handleKeyPress(e) {
    let tecla = e.charCode;
    let caracter = String.fromCharCode(tecla);
    console.log(caracter);
    /*  if (!reg.test(caracter)) {
      return {
        valid: false,
        message: 'Description should be string only'
      };
    } */
    return true;
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
    const rowEvents = {
  /*     onClick: (e, row, rowIndex) => {
        console.log(`clicked on row with index: ${rowIndex}`);
      },
      onMouseEnter: (e, row, rowIndex) => {
         this.props.showLocation(row.id);
        if (this.props.location.location.id !== "") {
          console.log(
            "you're watching: " + JSON.stringify(this.props.location.location)
          );
        } 
      }, */
    };
    const { ToggleList } = ColumnToggle;

    const renderAddTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Agragar nueva Localidad
      </Tooltip>
    );
    const renderExportCsvTooltip = (props) => (
      <Tooltip id="button-tooltip" {...props}>
        Export to CSV
      </Tooltip>
    );

    //para traer data del redux
    //console.log(this.props.location.locations.data);
    return (
      <div className="content-wrapper">
        <HeaderContent
          index="Home"
          property="Localidades"
          iconProperty="fas fa-globe"
          show={this.props.location.list_spinner}
        />

        {/*  <Spinner show={this.props.location.list_spinner} />*/}
        <section className="content">
          <div className="row">
            <div className="col-md-12">
              <div className="box">
                <div className="box-header">
                  {/*   <Link
                    to="locations/add"
                    className="btn btn-primary pull-right"
                  >
                    Add <i className="fa fa-plus"></i>
                  </Link> 
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.openAddLocationModal.bind(this)}
                  >
                    <i className="fa fa-plus"></i>
                  </button>*/}
                </div>

                <div className="box-body">

                  <div >
                    {this.props.location.locations ? (
                      <ToolkitProvider
                        bootstrap4
                        keyField="id"
                        data={this.props.location.locations}
                        columns={this.state.columns}
                        columnToggle
                        exportCSV={{
                          fileName: "locationList.csv",
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
                                onClick={this.openAddLocationModal.bind(this)}
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
                              rowEvents={rowEvents}
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
                                  //console.log("start to edit row!!!"+ JSON.stringify(column));
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
                  {/*  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th width="15%">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.props.location.locations.data
                        ? this.props.location.locations.data.map((item) => (
                            <Row key={item.id} location={item} />
                          ))
                        : null}
                    </tbody>
                  </table> */}
                </div>
              </div>
            </div>
          </div>
          {/* <AddModal show_modal={this.state.show_add_location_modal} close_modal={this.closeAddLocationModal.bind(this)} /> */}
          <AddModal2
            isOpen={this.state.show_add_location_modal}
            toggle={this.closeAddLocationModal.bind(this)}
          />
        </section>
<ToastrNotify/>
      </div>
    );
  }
}
const mapStateToProps = (state, ownProps) => {
  return {
    location: state.location,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    listLocations: (page) => dispatch(listLocations(page)),
    setLocationDefaults: () => dispatch(setLocationDefaults()),
    deleteLocation: (id) => dispatch(deleteLocation(id)),
    showLocation: (id) => dispatch(showLocation(id)),
    editLocation: (dsc, id) => dispatch(editLocation(dsc, id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Location);
