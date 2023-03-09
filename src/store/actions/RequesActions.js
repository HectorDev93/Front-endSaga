import * as RequesTypes from "../actiontypes/RequesTypes";

import Reques from "../../components/apis/Reques";
import { toast } from "react-toastify";

function handleRequesChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: RequesTypes.HANDLE_REQUES_CHANGE,
      data: value,
      field,
      checked,
    });
    
  };
}

function setRequesDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: RequesTypes.SET_REQUES_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listRequess(user) {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: RequesTypes.LIST_REQUESS,
    });

    // async call must dispatch action whether on success or failure
    Reques.list(user)
      .then((response) => {
        dispatch({
          type: RequesTypes.LIST_REQUESS_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: RequesTypes.LIST_REQUESS_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * list all action
 * this function used as a helper action for example to populate dropdowns
 * in other forms
 */
function listAllRequess() {
  return function (dispatch, getState) {
    // async call
    Reques.listAll().then((response) => {
      dispatch({
        type: RequesTypes.LIST_ALL_REQUESS,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addReques(name, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: RequesTypes.CREATE_REQUESS,
    });

    // async call must dispatch action whether on success or failure
    Reques.add(name)
      .then((response) => {
        dispatch({
          type: RequesTypes.CREATE_REQUESS_SUCCESS,
          data: response.data,
        });
        toast.success("Actividad creada correctamente");

        cb();
      })
      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: RequesTypes.CREATE_REQUESS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este caso existe");
        }else{
        dispatch({
          type: RequesTypes.CREATE_REQUESS_FAILURE,
          error: error.response.data,
        });
        toast.error("hubo un error al crear actividad");
      }
      });
  };
}

/**
 * show Society action
 */
function showReques(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: RequesTypes.SHOW_REQUES,
    });

    // async call must dispatch action whether on success or failure
    Reques.showOne(id)
      .then((response) => {
        dispatch({
          type: RequesTypes.SHOW_REQUES_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: RequesTypes.SHOW_REQUES_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editReques(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: RequesTypes.EDIT_REQUESS,
    });

    // async call must dispatch action whether on success or failure
    Reques.edit(name, id)
      .then((response) => {
          dispatch({
            type: RequesTypes.EDIT_REQUESS_SUCCESS,
            data: response.data,
          });

          toast.success("Actividad actualizada correctamente");
          
          cb();
      })

      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: RequesTypes.EDIT_REQUESS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este caso existe");
        }else{
        dispatch({
          type: RequesTypes.EDIT_REQUESS_FAILURE,
          error: error.response.data,
        });

        toast.error("Hubo un error al actualizar actividad");
      }
      });
  };
}

/**
 * delete Society action
 */
function deleteReques(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: RequesTypes.DELETE_REQUESS,
    });

    // async call must dispatch action whether on success or failure
    Reques.remove(id)
      .then((response) => {
        setTimeout(() => {
          dispatch({
            type: RequesTypes.DELETE_REQUESS_SUCCESS,
            message: response.data.message,
            id: id,
          });

          toast.success("Actividad eliminada correctamente");
        
        }, 10);
      })
      .catch((error) => {
        dispatch({
          type: RequesTypes.DELETE_REQUESS_FAILURE,
          error: error.response.data,
        });

        toast.error("hubo un error al eliminar actividad");
      });
  };
}

function resetFields() {

  return function (dispatch, getState) {

      dispatch({
          type: RequesTypes.RESET_FIELDS
      });
  }
}
export {
  listRequess,
  handleRequesChange,
  addReques,
  showReques,
  editReques,
  deleteReques,
  setRequesDefaults,
  listAllRequess,
  resetFields
};
