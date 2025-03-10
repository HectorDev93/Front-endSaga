import * as DepartmentTypes from "../actiontypes/DepartmentTypes";

import Department from "../../components/apis/Department";
import { toast } from "react-toastify";

function handleDepartmentChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: DepartmentTypes.HANDLE_DEPARTMENT_CHANGE,
      data: value,
      field,
      checked,
    });
    
  };
}

function setDepartmentDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: DepartmentTypes.SET_DEPARTMENT_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listDepartments() {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: DepartmentTypes.LIST_DEPARTMENTS,
    });

    // async call must dispatch action whether on success or failure
    Department.list()
      .then((response) => {
        dispatch({
          type: DepartmentTypes.LIST_DEPARTMENTS_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DepartmentTypes.LIST_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });
      });
  };
}
function listDepartmentsSociety(id){
  //alert(id);
  return function (dispatch, getState){
    //async call
    Department.getBySociety(id).then((response) =>{
      dispatch({
        type: DepartmentTypes.LIST_DEPARTMENTS_SOCIETY,
        data: response.data.data
      });
    });
  }
}
/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllDepartments() {
  return function (dispatch, getState) {
    // async call
    Department.listAll().then((response) => {
      dispatch({
        type: DepartmentTypes.LIST_ALL_DEPARTMENTS,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addDepartment(name, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: DepartmentTypes.CREATE_DEPARTMENTS,
    });

    // async call must dispatch action whether on success or failure
    Department.add(name)
      .then((response) => {
        dispatch({
          type: DepartmentTypes.CREATE_DEPARTMENTS_SUCCESS,
          data: response.data,
        });
        toast.success("Solicitud exitosa");

        cb();
      })
      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: DepartmentTypes.CREATE_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este elemento ya existe en el sistema");
        }else{
        dispatch({
          type: DepartmentTypes.CREATE_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });
        toast.warning("Permiso denegado");
      }
      });
  };
}

/**
 * show Society action
 */
function showDepartment(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: DepartmentTypes.SHOW_DEPARTMENT,
    });

    // async call must dispatch action whether on success or failure
    Department.showOne(id)
      .then((response) => {
        dispatch({
          type: DepartmentTypes.SHOW_DEPARTMENT_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: DepartmentTypes.SHOW_DEPARTMENT_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editDepartment(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: DepartmentTypes.EDIT_DEPARTMENTS,
    });

    // async call must dispatch action whether on success or failure
    Department.edit(name, id)
      .then((response) => {
          dispatch({
            type: DepartmentTypes.EDIT_DEPARTMENTS_SUCCESS,
            data: response.data,
          });

          toast.success("Resgistro actualizado correctamente");
          
          // eslint-disable-next-line no-unused-expressions
          cb();
      })

      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: DepartmentTypes.EDIT_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este registro existe en el sistema");
        }else{
        dispatch({
          type: DepartmentTypes.EDIT_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });

        toast.warning("Permiso denegado");
      }
      });
  };
}

/**
 * delete Society action
 */
function deleteDepartment(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: DepartmentTypes.DELETE_DEPARTMENTS,
    });

    // async call must dispatch action whether on success or failure
    Department.remove(id)
      .then((response) => {

          dispatch({
            type: DepartmentTypes.DELETE_DEPARTMENTS_SUCCESS,
            message: response.data.message,
            id: id,
          });

          toast.success("Solitud exitosa");

      
        })
      .catch((error) => {
        dispatch({
          type: DepartmentTypes.DELETE_DEPARTMENTS_FAILURE,
          error: error.response.data,
        });

        toast.warning("Permiso denegado");
      });
  };
}

function resetFields() {

  return function (dispatch, getState) {

      dispatch({
          type: DepartmentTypes.RESET_FIELDS
      });
  }
}
export {
  listDepartments,
  listDepartmentsSociety,
  handleDepartmentChange,
  addDepartment,
  showDepartment,
  editDepartment,
  deleteDepartment,
  setDepartmentDefaults,
  listAllDepartments,
  resetFields
};
