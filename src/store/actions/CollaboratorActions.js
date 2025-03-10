import * as CollaboratorTypes from "../actiontypes/CollaboratorTypes";

import Collaborator from "../../components/apis/Collaborator";
import { toast } from "react-toastify";

function handleCollaboratorChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: CollaboratorTypes.HANDLE_COLLABORATOR_CHANGE,
      data: value,
      field,
      checked,
    });
    
  };
}

function setCollaboratorDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: CollaboratorTypes.SET_COLLABORATOR_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listCollaborators() {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: CollaboratorTypes.LIST_COLLABORATORS,
    });

    // async call must dispatch action whether on success or failure
    Collaborator.list()
      .then((response) => {
        dispatch({
          type: CollaboratorTypes.LIST_COLLABORATORS_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CollaboratorTypes.LIST_COLLABORATORS_FAILURE,
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
function listAllCollaborators() {
  return function (dispatch, getState) {
    // async call
    Collaborator.listAll().then((response) => {
      dispatch({
        type: CollaboratorTypes.LIST_ALL_COLLABORATORS,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addCollaborator(name, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CollaboratorTypes.CREATE_COLLABORATORS,
    });

    // async call must dispatch action whether on success or failure
    Collaborator.add(name)
      .then((response) => {
        dispatch({
          type: CollaboratorTypes.CREATE_COLLABORATORS_SUCCESS,
          data: response.data,
        });
        toast.success("Solicitud exitosa");

        cb();
      })
      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: CollaboratorTypes.CREATE_COLLABORATORS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este registro existe en el sistema");
        }else{
        dispatch({
          type: CollaboratorTypes.CREATE_COLLABORATORS_FAILURE,
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
function showCollaborator(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CollaboratorTypes.SHOW_COLLABORATOR,
    });

    // async call must dispatch action whether on success or failure
    Collaborator.showOne(id)
      .then((response) => {
        dispatch({
          type: CollaboratorTypes.SHOW_COLLABORATOR_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: CollaboratorTypes.SHOW_COLLABORATOR_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editCollaborator(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CollaboratorTypes.EDIT_COLLABORATORS,
    });

    // async call must dispatch action whether on success or failure
    Collaborator.edit(name, id)
      .then((response) => {
          dispatch({
            type: CollaboratorTypes.EDIT_COLLABORATORS_SUCCESS,
            data: response.data,
          });

          toast.success("Registro actualizado correctamente");
          
          cb();
      })

      .catch((error) => {
        if(error.response.status === 303){
          dispatch({
          type: CollaboratorTypes.EDIT_COLLABORATORS_FAILURE,
          error: error.response.data,
        });
          //toast.error("Esta categoria existe" + JSON.stringify(error.response.status));
          toast.error("Este registro existe en el sistema");
        }else{
        dispatch({
          type: CollaboratorTypes.EDIT_COLLABORATORS_FAILURE,
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
function deleteCollaborator(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: CollaboratorTypes.DELETE_COLLABORATORS,
    });

    // async call must dispatch action whether on success or failure
    Collaborator.remove(id)
      .then((response) => {
        setTimeout(() => {
          dispatch({
            type: CollaboratorTypes.DELETE_COLLABORATORS_SUCCESS,
            message: response.data.message,
            id: id,
          });

          toast.success("Solicitud exitosa");
        
        }, 10);
      })
      .catch((error) => {
        dispatch({
          type: CollaboratorTypes.DELETE_COLLABORATORS_FAILURE,
          error: error.response.data,
        });

        toast.warning("Permiso denegado");
      });
  };
}

function resetFields() {

  return function (dispatch, getState) {

      dispatch({
          type: CollaboratorTypes.RESET_FIELDS
      });
  }
}
export {
  listCollaborators,
  handleCollaboratorChange,
  addCollaborator,
  showCollaborator,
  editCollaborator,
  deleteCollaborator,
  setCollaboratorDefaults,
  listAllCollaborators,
  resetFields
};
