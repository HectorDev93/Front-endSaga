import * as SocietyTypes from "../actiontypes/SocietyTypes";
import * as UtilTypes from "../actiontypes/UtilTypes";

import Society from "../../components/apis/Society";
import { toast } from "react-toastify";

function handleSocietyChange(field, value, checked) {
  return function (dispatch, getState) {
    dispatch({
      type: SocietyTypes.HANDLE_SOCIETY_CHANGE,
      data: value,
      field,
      checked,
    });
  };
}

function setSocietyDefaults() {
  return function (dispatch, getState) {
    dispatch({
      type: SocietyTypes.SET_SOCIETY_DEFAULTS,
    });
  };
}

/**
 * list Societies action
 */
function listSocieties() {
  return function (dispatch, getState) {
    // start sending request (first dispatch)
    dispatch({
      type: SocietyTypes.LIST_SOCIETIES,
    });

    // async call must dispatch action whether on success or failure
    Society.list()
      .then((response) => {
        dispatch({
          type: SocietyTypes.LIST_SOCIETIES_SUCCESS,
          data: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SocietyTypes.LIST_SOCIETIES_FAILURE,
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
function listAllSocieties() {
  return function (dispatch, getState) {
    // async call
    Society.listAll().then((response) => {
      dispatch({
        type: SocietyTypes.LIST_ALL_SOCIETIES,
        data: response.data.data,
      });
    });
  };
}

/**
 * add Society action
 */
function addSociety(name, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: SocietyTypes.CREATE_SOCIETIES,
    });

    // async call must dispatch action whether on success or failure
    Society.add(name)
      .then((response) => {
        dispatch({
          type: SocietyTypes.CREATE_SOCIETIES_SUCCESS,
          data: response.data,
        });
        toast.success("Sociedad creada correctamente");

        cb();
      })
      .catch((error) => {
        dispatch({
          type: SocietyTypes.CREATE_SOCIETIES_FAILURE,
          error: error.response.data,
        });
        toast.error("Hubo un error al crear sociedad");
      });
  };
}

/**
 * show Society action
 */
function showSociety(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: SocietyTypes.SHOW_SOCIETY,
    });

    // async call must dispatch action whether on success or failure
    Society.showOne(id)
      .then((response) => {
        dispatch({
          type: SocietyTypes.SHOW_SOCIETY_SUCCESS,
          data: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: SocietyTypes.SHOW_SOCIETY_FAILURE,
          error: error.response.data,
        });
      });
  };
}

/**
 * edit Society action
 */
function editSociety(name, id, cb) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: SocietyTypes.EDIT_SOCIETIES,
    });

    // async call must dispatch action whether on success or failure
    Society.edit(name, id)
      .then((response) => {
        setTimeout(() => {
          dispatch({
            type: SocietyTypes.EDIT_SOCIETIES_SUCCESS,
            data: response.data,
          });

          toast.success("Sociedad actualizada correctamente");
          setTimeout(() => {
            dispatch({
              type: SocietyTypes.LIST_SOCIETIES,
            });
            Society.list()
              .then((response) => {
                dispatch({
                  type: SocietyTypes.LIST_SOCIETIES_SUCCESS,
                  data: response.data.data,
                });
              })
              .catch((error) => {
                dispatch({
                  type: SocietyTypes.LIST_SOCIETIES_FAILURE,
                  error: error.response.data,
                });
              });
            setTimeout(() => {
              dispatch({
                type: UtilTypes.HIDE_MESSAGE,
              });
            }, 2000);
          }, 500);
        }, 10);
      })
      .catch((error) => {
        dispatch({
          type: SocietyTypes.EDIT_SOCIETIES_FAILURE,
          error: error.response.data,
        });

        toast.error("Hubo un error actualizando la sociedad");
      });
  };
}

/**
 * delete Society action
 */
function deleteSociety(id) {
  return function (dispatch, getState) {
    // start creation show spinner
    dispatch({
      type: SocietyTypes.DELETE_SOCIETIES,
    });

    // async call must dispatch action whether on success or failure
    Society.remove(id)
      .then((response) => {
        setTimeout(() => {
          dispatch({
            type: SocietyTypes.DELETE_SOCIETIES_SUCCESS,
            message: response.data.message,
            id: id,
          });

          toast.success("Sociedad eliminada correctamente");
          setTimeout(() => {
            dispatch({
              type: UtilTypes.HIDE_MESSAGE,
            });
          }, 3000);
        }, 10);
      })
      .catch((error) => {
        dispatch({
          type: SocietyTypes.DELETE_SOCIETIES_FAILURE,
          error: error.response.data,
        });

        toast.error("Hubo un error eliminando la sociedad");
      });
  };
}

export {
  listSocieties,
  handleSocietyChange,
  addSociety,
  showSociety,
  editSociety,
  deleteSociety,
  setSocietyDefaults,
  listAllSocieties,
};
